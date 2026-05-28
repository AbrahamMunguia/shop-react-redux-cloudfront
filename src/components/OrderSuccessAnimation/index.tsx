import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";

// ─── Keyframes ────────────────────────────────────────────────────────────────

const overlayExpand = keyframes`
  0%   { clip-path: circle(0% at 50% 50%); opacity: 0.6; }
  100% { clip-path: circle(150% at 50% 50%); opacity: 1; }
`;

const circlePop = keyframes`
  0%   { transform: scale(0);   opacity: 0; }
  60%  { transform: scale(1.12); opacity: 1; }
  80%  { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

const checkDraw = keyframes`
  0%   { stroke-dashoffset: 120; opacity: 0; }
  20%  { opacity: 1; }
  100% { stroke-dashoffset: 0; }
`;

const ringPulse = keyframes`
  0%   { transform: scale(1);    opacity: 0.6; }
  100% { transform: scale(1.55); opacity: 0;   }
`;

const textRise = keyframes`
  0%   { opacity: 0; transform: translateY(18px); }
  100% { opacity: 1; transform: translateY(0);    }
`;

const subtitleRise = keyframes`
  0%   { opacity: 0; transform: translateY(12px); }
  100% { opacity: 1; transform: translateY(0);    }
`;

// ─── Component ────────────────────────────────────────────────────────────────

interface OrderSuccessAnimationProps {
    /** Called after the entrance animation completes so the parent can swap to a static success view if desired */
    onAnimationEnd?: () => void;
}

const GREEN = "#00a650"; // Mercado Pago brand green
const LIGHT_GREEN = "#00c65e";

export default function OrderSuccessAnimation({
    onAnimationEnd,
}: OrderSuccessAnimationProps) {
    const [phase, setPhase] = useState<"entering" | "done">("entering");

    useEffect(() => {
        // After the longest animation (~1.8 s) we consider it "done"
        const id = setTimeout(() => {
            setPhase("done");
            onAnimationEnd?.();
        }, 2400);
        return () => clearTimeout(id);
    }, [onAnimationEnd]);

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                zIndex: 1400,
                backgroundColor: GREEN,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                // Clip-path expanding circle entrance
                animation: `${overlayExpand} 0.55s cubic-bezier(0.22, 1, 0.36, 1) both`,
            }}
        >
            {/* ── Pulsing ring behind the circle ── */}
            <Box
                sx={{
                    position: "absolute",
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    border: `4px solid rgba(255,255,255,0.55)`,
                    animation: `${ringPulse} 1.1s ease-out 0.55s both`,
                }}
            />

            {/* ── White circle ── */}
            <Box
                sx={{
                    width: 130,
                    height: 130,
                    borderRadius: "50%",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
                    animation: `${circlePop} 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 0.45s both`,
                }}
            >
                {/* ── Animated checkmark SVG ── */}
                <svg
                    viewBox="0 0 52 52"
                    fill="none"
                    width={68}
                    height={68}
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ overflow: "visible" }}
                >
                    <polyline
                        points="10,27 22,39 43,16"
                        stroke={GREEN}
                        strokeWidth="5.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            strokeDasharray: 120,
                            strokeDashoffset: 120,
                            animation: `${checkDraw} 0.55s cubic-bezier(0.65, 0, 0.45, 1) 0.85s both`,
                        }}
                    />
                </svg>
            </Box>

            {/* ── Title ── */}
            <Typography
                variant="h5"
                sx={{
                    color: "white",
                    fontWeight: 700,
                    letterSpacing: "-0.3px",
                    textAlign: "center",
                    px: 3,
                    animation: `${textRise} 0.5s ease-out 1.25s both`,
                }}
            >
                ¡Your order is confirmed!
            </Typography>

            {/* ── Subtitle ── */}
            <Typography
                variant="body1"
                sx={{
                    color: "rgba(255,255,255,0.88)",
                    textAlign: "center",
                    maxWidth: 300,
                    lineHeight: 1.5,
                    px: 3,
                    animation: `${subtitleRise} 0.5s ease-out 1.5s both`,
                }}
            >
                Our manager will contact you shortly to confirm the details of your
                purchase.
            </Typography>
        </Box>
    );
}