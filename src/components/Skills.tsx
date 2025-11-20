import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import './Skills.scss';

const skillsData = [
  "React", "TypeScript", "Next.js", "Node.js", "GraphQL", "Sass",
  "Figma", "Git", "Webpack", "Vite", "CRO", "A/B Testing",
  "UI/UX", "Performance", "SEO", "Wordpress", "Shopify", "GTM","Headless"
];

const Skills = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    let resizeTimeout: number;
    let hasInitialized = false;

    const initMatter = () => {
      // Clean up existing instance if any
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        if (renderRef.current.canvas) {
          renderRef.current.canvas.remove();
        }
      }
      if (runnerRef.current && engineRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }
      if (engineRef.current) {
        Matter.Composite.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
      }

      if (!sceneRef.current) return;

      // Module aliases
      const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Events = Matter.Events;

      // Create engine
      const engine = Engine.create();
      engineRef.current = engine;

      // Create renderer
      const render = Render.create({
        element: sceneRef.current,
        engine: engine,
        options: {
          width: sceneRef.current.clientWidth,
          height: sceneRef.current.clientHeight,
          background: 'transparent',
          wireframes: false,
          pixelRatio: window.devicePixelRatio
        }
      });
      renderRef.current = render;

      // Create boundaries
      const wallOptions = { 
        isStatic: true, 
        render: { fillStyle: 'transparent' } 
      };
      
      const ground = Bodies.rectangle(
        sceneRef.current.clientWidth / 2,
        sceneRef.current.clientHeight + 30,
        sceneRef.current.clientWidth,
        60,
        wallOptions
      );
      
      const topWall = Bodies.rectangle(
        sceneRef.current.clientWidth / 2,
        -30,
        sceneRef.current.clientWidth,
        60,
        wallOptions
      );

      const leftWall = Bodies.rectangle(
        -30,
        sceneRef.current.clientHeight / 2,
        60,
        sceneRef.current.clientHeight,
        wallOptions
      );
      
      const rightWall = Bodies.rectangle(
        sceneRef.current.clientWidth + 30,
        sceneRef.current.clientHeight / 2,
        60,
        sceneRef.current.clientHeight,
        wallOptions
      );

      Composite.add(engine.world, [ground, topWall, leftWall, rightWall]);

      // Create skill bodies
      const isMobile = window.innerWidth < 768;
      const skillBodies = skillsData.map((skill) => {
        const baseWidth = isMobile ? 80 : 120;
        const charWidth = isMobile ? 6 : 8;
        const width = baseWidth + skill.length * charWidth; 
        const height = isMobile ? 40 : 50;
        const x = Math.random() * (sceneRef.current!.clientWidth - width) + width / 2;
        const y = Math.random() * 200 + 50; 

        const body = Bodies.rectangle(x, y, width, height, {
          chamfer: { radius: isMobile ? 20 : 25 }, 
          restitution: 0.5, 
          friction: 0.001,
          render: {
            fillStyle: '#ffffff',
            strokeStyle: '#f99e1a',
            lineWidth: 2
          },
          label: skill 
        });

        return body;
      });

      Composite.add(engine.world, skillBodies);

      // Add mouse control
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });

      Composite.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      // Custom rendering for text
      Events.on(render, 'afterRender', () => {
        const context = render.context;
        const isMobile = window.innerWidth < 768;
        context.font = `bold ${isMobile ? '12px' : '16px'} "Space Mono", monospace`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#1a1a1a';

        skillBodies.forEach((body) => {
          const { x, y } = body.position;
          const angle = body.angle;

          context.save();
          context.translate(x, y);
          context.rotate(angle);
          context.fillText(body.label, 0, 0);
          context.restore();
        });
      });

      // Run the engine
      Render.run(render);
      const runner = Runner.create();
      runnerRef.current = runner;
      Runner.run(runner, engine);
    };

    // IntersectionObserver to initialize only when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasInitialized) {
            hasInitialized = true;
            initMatter();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sceneRef.current) {
      observer.observe(sceneRef.current.parentElement!);
    }

    // Handle resize with debounce
    const handleResize = () => {
      if (!hasInitialized) return;
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initMatter();
      }, 300);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        if (renderRef.current.canvas) {
          renderRef.current.canvas.remove();
        }
      }
      if (runnerRef.current && engineRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }
      if (engineRef.current) {
        Matter.Composite.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
      }
    };
  }, []);

  return (
    <section className="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-number">03</span>
          <h2>ABILITY KIT</h2>
        </div>
        <div className="canvas-container" ref={sceneRef}></div>
      </div>
    </section>
  );
};

export default Skills;
