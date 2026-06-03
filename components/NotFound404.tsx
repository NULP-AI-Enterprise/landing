"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function NotFound404({ homeHref = '/uk' }: { homeHref?: string }) {
    const visorRef = useRef<HTMLCanvasElement>(null);
    const cordRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Draw visor
        const visorCanvas = visorRef.current;
        if (visorCanvas) {
            const ctx = visorCanvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(5, 45);
                ctx.bezierCurveTo(15, 64, 45, 64, 55, 45);
                ctx.lineTo(55, 20);
                ctx.bezierCurveTo(55, 15, 50, 10, 45, 10);
                ctx.lineTo(15, 10);
                ctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
                ctx.lineTo(5, 45);
                ctx.fillStyle = '#1a1a2e';
                ctx.strokeStyle = '#f5f6fa';
                ctx.fill();
                ctx.stroke();
            }
        }

        // Animate cord
        const cordCanvas = cordRef.current;
        if (!cordCanvas) return;
        const ctx = cordCanvas.getContext('2d');
        if (!ctx) return;

        let y1 = 160, y2 = 100, y3 = 100;
        let y1Forward = true, y2Forward = false, y3Forward = true;
        let animId: number;

        function animate() {
            animId = requestAnimationFrame(animate);
            ctx!.clearRect(0, 0, cordCanvas!.width, cordCanvas!.height);

            ctx!.beginPath();
            ctx!.moveTo(130, 170);
            ctx!.bezierCurveTo(250, y1, 345, y2, 400, y3);
            ctx!.strokeStyle = 'white';
            ctx!.lineWidth = 8;
            ctx!.stroke();

            if (y1 === 100) y1Forward = true;
            if (y1 === 300) y1Forward = false;
            if (y2 === 100) y2Forward = true;
            if (y2 === 310) y2Forward = false;
            if (y3 === 100) y3Forward = true;
            if (y3 === 317) y3Forward = false;

            y1Forward ? y1 += 1 : y1 -= 1;
            y2Forward ? y2 += 1 : y2 -= 1;
            y3Forward ? y3 += 1 : y3 -= 1;
        }

        animate();
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <div className="notfound-scene">
            <style>{`
                .notfound-scene {
                    position: relative;
                    width: 100%;
                    min-height: 100vh;
                    overflow: hidden;
                    background: linear-gradient(90deg, #12121f 23%, #0A0A15 100%);
                    font-family: var(--font-display, 'Manrope', system-ui, sans-serif);
                }

                .nf-moon {
                    background: linear-gradient(90deg, rgba(208,208,208,1) 48%, rgba(145,145,145,1) 100%);
                    position: absolute;
                    top: -100px;
                    left: -300px;
                    width: 900px;
                    height: 900px;
                    border-radius: 100%;
                    box-shadow: 0px 0px 30px -4px rgba(0,0,0,0.5);
                }

                .nf-crater {
                    position: absolute;
                    border-radius: 100%;
                    background: linear-gradient(90deg, rgba(122,122,122,1) 38%, rgba(195,195,195,1) 100%);
                    opacity: 0.6;
                }

                .nf-crater1 { top: 250px; left: 500px; width: 60px; height: 180px; }
                .nf-crater2 { top: 650px; left: 340px; width: 40px; height: 80px; transform: rotate(55deg); }
                .nf-crater3 { top: -20px; left: 40px; width: 65px; height: 120px; transform: rotate(250deg); }

                .nf-star {
                    background: grey;
                    position: absolute;
                    width: 5px;
                    height: 5px;
                    border-radius: 100%;
                    opacity: 0.4;
                    animation: nf-shimmer 1.5s infinite alternate;
                }

                @keyframes nf-shimmer {
                    from { opacity: 0; }
                    to { opacity: 0.7; }
                }

                .nf-star1 { top: 40%; left: 50%; animation-delay: 1s; }
                .nf-star2 { top: 60%; left: 90%; animation-delay: 3s; }
                .nf-star3 { top: 10%; left: 70%; animation-delay: 2s; }
                .nf-star4 { top: 90%; left: 40%; }
                .nf-star5 { top: 20%; left: 30%; animation-delay: 0.5s; }

                .nf-error {
                    position: absolute;
                    left: 100px;
                    top: 400px;
                    transform: translateY(-60%);
                    color: #4a4f5e;
                    z-index: 10;
                }

                .nf-error__title {
                    font-size: 10em;
                    font-weight: 800;
                    line-height: 1;
                    background: linear-gradient(135deg, #6C63FF 0%, #2A2F8F 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .nf-error__subtitle {
                    font-size: 2em;
                    font-weight: 700;
                    color: #363e49;
                    margin-top: 0.25em;
                }

                .nf-error__desc {
                    opacity: 1;
                    color: #363e49;
                    font-weight: 700;
                    margin-top: 0.5em;
                }

                .nf-error__btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    min-width: 7em;
                    margin-top: 2.5em;
                    margin-right: 0.5em;
                    padding: 0.7em 2em;
                    outline: none;
                    border: 2px solid #6C63FF;
                    background-color: #6C63FF;
                    border-radius: 8em;
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 0.8em;
                    font-weight: 700;
                    font-family: inherit;
                    text-decoration: none;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }

                .nf-error__btn:hover {
                    box-shadow: 0 0 20px rgba(108, 99, 255, 0.4);
                    transform: translateY(-1px);
                }

                .nf-astronaut {
                    position: absolute;
                    width: 185px;
                    height: 300px;
                    left: 70%;
                    top: 50%;
                    transform: translate(-50%, -50%) rotate(20deg) scale(1.2);
                    z-index: 10;
                }

                .nf-astro-head {
                    background-color: white;
                    position: absolute;
                    top: 60px; left: 60px;
                    width: 60px; height: 60px;
                    border-radius: 2em;
                }

                .nf-astro-flare1 {
                    background-color: #7f8fa6;
                    position: absolute;
                    top: 28px; left: 40px;
                    width: 10px; height: 10px;
                    border-radius: 2em;
                    opacity: 0.5;
                }

                .nf-astro-flare2 {
                    background-color: #718093;
                    position: absolute;
                    top: 40px; left: 38px;
                    width: 5px; height: 5px;
                    border-radius: 2em;
                    opacity: 0.3;
                }

                .nf-astro-backpack {
                    background-color: #bfbfbf;
                    position: absolute;
                    top: 90px; left: 47px;
                    width: 86px; height: 90px;
                    border-radius: 8px;
                }

                .nf-astro-body {
                    background-color: #e6e6e6;
                    position: absolute;
                    top: 115px; left: 55px;
                    width: 70px; height: 80px;
                    border-radius: 8px;
                }

                .nf-astro-chest {
                    background-color: #d9d9d9;
                    position: absolute;
                    top: 140px; left: 68px;
                    width: 45px; height: 25px;
                    border-radius: 6px;
                }

                .nf-astro-arm-l1 {
                    background-color: #e6e6e6;
                    position: absolute;
                    top: 127px; left: 9px;
                    width: 65px; height: 20px;
                    border-radius: 8px;
                    transform: rotate(-30deg);
                }

                .nf-astro-arm-l2 {
                    background-color: #e6e6e6;
                    position: absolute;
                    top: 102px; left: 7px;
                    width: 20px; height: 45px;
                    border-radius: 8px;
                    transform: rotate(-12deg);
                    border-top-left-radius: 8em;
                    border-top-right-radius: 8em;
                }

                .nf-astro-arm-r1 {
                    background-color: #e6e6e6;
                    position: absolute;
                    top: 113px; left: 100px;
                    width: 65px; height: 20px;
                    border-radius: 8px;
                    transform: rotate(-10deg);
                }

                .nf-astro-arm-r2 {
                    background-color: #e6e6e6;
                    position: absolute;
                    top: 78px; left: 141px;
                    width: 20px; height: 45px;
                    border-radius: 8px;
                    transform: rotate(-10deg);
                    border-top-left-radius: 8em;
                    border-top-right-radius: 8em;
                }

                .nf-astro-thumb-l {
                    background-color: #e6e6e6;
                    position: absolute;
                    top: 110px; left: 21px;
                    width: 10px; height: 6px;
                    border-radius: 8em;
                    transform: rotate(-35deg);
                }

                .nf-astro-thumb-r {
                    background-color: #e6e6e6;
                    position: absolute;
                    top: 90px; left: 133px;
                    width: 10px; height: 6px;
                    border-radius: 8em;
                    transform: rotate(20deg);
                }

                .nf-astro-wrist-l {
                    background-color: #6C63FF;
                    position: absolute;
                    top: 122px; left: 6.5px;
                    width: 21px; height: 4px;
                    border-radius: 8em;
                    transform: rotate(-15deg);
                }

                .nf-astro-wrist-r {
                    background-color: #6C63FF;
                    position: absolute;
                    top: 98px; left: 141px;
                    width: 21px; height: 4px;
                    border-radius: 8em;
                    transform: rotate(-10deg);
                }

                .nf-astro-leg-l {
                    background-color: #e6e6e6;
                    position: absolute;
                    top: 188px; left: 50px;
                    width: 23px; height: 75px;
                    transform: rotate(10deg);
                }

                .nf-astro-leg-r {
                    background-color: #e6e6e6;
                    position: absolute;
                    top: 188px; left: 108px;
                    width: 23px; height: 75px;
                    transform: rotate(-10deg);
                }

                .nf-astro-foot-l {
                    background-color: white;
                    position: absolute;
                    top: 240px; left: 43px;
                    width: 28px; height: 20px;
                    transform: rotate(10deg);
                    border-radius: 3px;
                    border-top-left-radius: 8em;
                    border-top-right-radius: 8em;
                    border-bottom: 4px solid #6C63FF;
                }

                .nf-astro-foot-r {
                    background-color: white;
                    position: absolute;
                    top: 240px; left: 111px;
                    width: 28px; height: 20px;
                    transform: rotate(-10deg);
                    border-radius: 3px;
                    border-top-left-radius: 8em;
                    border-top-right-radius: 8em;
                    border-bottom: 4px solid #6C63FF;
                }

                .nf-astro-cord {
                    position: absolute;
                    top: 0; left: 0;
                    width: 500px; height: 500px;
                    z-index: -1;
                }

                @media (max-width: 1024px) {
                    .nf-error {
                        left: 50px;
                        top: 350px;
                    }
                    .nf-error__title { font-size: 7em; }
                    .nf-astronaut {
                        left: 65%;
                        transform: translate(-50%, -50%) rotate(20deg) scale(0.9);
                    }
                }

                @media (max-width: 768px) {
                    .nf-moon {
                        top: -150px;
                        left: -400px;
                        width: 700px;
                        height: 700px;
                    }
                    .nf-crater1 { top: 180px; left: 380px; width: 45px; height: 140px; }
                    .nf-crater2 { top: 500px; left: 250px; }
                    .nf-crater3 { top: -20px; left: 30px; width: 50px; height: 90px; }
                    .nf-error {
                        left: 30px;
                        top: 55%;
                        right: 30px;
                    }
                    .nf-error__title { font-size: 5em; }
                    .nf-error__subtitle { font-size: 1.4em; }
                    .nf-error__desc { font-size: 0.9em; }
                    .nf-astronaut {
                        left: 55%;
                        top: 22%;
                        transform: translate(-50%, -50%) rotate(20deg) scale(0.6);
                    }
                }

                @media (max-width: 480px) {
                    .nf-error__title { font-size: 4em; }
                    .nf-astronaut {
                        left: 60%;
                        top: 18%;
                        transform: translate(-50%, -50%) rotate(20deg) scale(0.45);
                    }
                }
            `}</style>

            {/* Moon */}
            <div className="nf-moon" />
            <div className="nf-crater nf-crater1" />
            <div className="nf-crater nf-crater2" />
            <div className="nf-crater nf-crater3" />

            {/* Stars */}
            <div className="nf-star nf-star1" />
            <div className="nf-star nf-star2" />
            <div className="nf-star nf-star3" />
            <div className="nf-star nf-star4" />
            <div className="nf-star nf-star5" />

            {/* Error text */}
            <div className="nf-error">
                <div className="nf-error__title">404</div>
                <div className="nf-error__subtitle">Хммм...</div>
                <div className="nf-error__desc">
                    Схоже, один із розробників заснув у космосі
                </div>
                <Link href={homeHref} className="nf-error__btn">
                    На головну
                </Link>
            </div>

            {/* Astronaut */}
            <div className="nf-astronaut">
                <div className="nf-astro-backpack" />
                <div className="nf-astro-body" />
                <div className="nf-astro-chest" />
                <div className="nf-astro-arm-l1" />
                <div className="nf-astro-arm-l2" />
                <div className="nf-astro-arm-r1" />
                <div className="nf-astro-arm-r2" />
                <div className="nf-astro-thumb-l" />
                <div className="nf-astro-thumb-r" />
                <div className="nf-astro-leg-l" />
                <div className="nf-astro-leg-r" />
                <div className="nf-astro-foot-l" />
                <div className="nf-astro-foot-r" />
                <div className="nf-astro-wrist-l" />
                <div className="nf-astro-wrist-r" />

                <div className="nf-astro-cord">
                    <canvas ref={cordRef} height={500} width={500} />
                </div>

                <div className="nf-astro-head">
                    <canvas ref={visorRef} width={60} height={60} />
                    <div className="nf-astro-flare1" />
                    <div className="nf-astro-flare2" />
                </div>
            </div>
        </div>
    );
}
