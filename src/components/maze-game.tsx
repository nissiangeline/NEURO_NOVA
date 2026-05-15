"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2, Route, User, AlertTriangle } from "lucide-react";
import { analyzeMazePerformance, AnalyzeMazePerformanceOutput } from "@/ai/flows/analyze-maze-performance";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import SpeakAloudButton from "./speak-aloud-button";

const TILE_SIZE = 40;
const DEVIATION_THRESHOLD = 15;

const LEVELS = [
  {
    maze: [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,0,0,0,0,1,0,1],
      [1,1,1,1,0,1,0,1],
      [1,0,0,1,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1]
    ],

    start: { x: 1, y: 1 },

    goal: { x: 6, y: 7 },
  },

  {
    maze: [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,1,0,1],
  [1,1,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,1,0,0,0,1],
  [1,0,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1]
],

start: { x: 1, y: 1 },

goal: { x: 8, y: 7 },
  

    

    
  },

  {
    maze: [
      [1,1,1,1,1,1,1,1,1,1],
      [1,0,1,0,0,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,1],
      [1,0,0,0,1,0,0,0,1,1],
      [1,1,1,1,1,1,1,0,1,1],
      [1,0,0,0,0,0,1,0,0,1],
      [1,0,1,1,1,0,1,1,0,1],
      [1,0,0,0,1,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1]
    ],

    start: { x: 1, y: 1 },

    goal: { x: 8, y: 7 },
  }
];

type MazeGameProps = {
  onGameComplete: (analyses: AnalyzeMazePerformanceOutput[]) => void;
};

export default function MazeGame({ onGameComplete }: MazeGameProps) {

  const { t } = useTranslation();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [currentLevel, setCurrentLevel] = useState(0);

  const [player, setPlayer] = useState(LEVELS[0].start);

  const [gameState, setGameState] = useState<
    "idle" | "playing" | "level_won" | "game_won"
  >("idle");

  const [startTime, setStartTime] = useState<number | null>(null);

  const [timeTaken, setTimeTaken] = useState<number | null>(null);

  const [analysis, setAnalysis] =
    useState<AnalyzeMazePerformanceOutput | null>(null);

  const [allAnalyses, setAllAnalyses] = useState<
    AnalyzeMazePerformanceOutput[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const level = LEVELS[currentLevel];

  const MAZE = level.maze;

  const GOAL_POS = level.goal;

  const drawMaze = useCallback(() => {

    const canvas = canvasRef.current;

    const ctx = canvas?.getContext("2d");

    if (!ctx || !canvas) return;

    canvas.width = MAZE[0].length * TILE_SIZE;

    canvas.height = MAZE.length * TILE_SIZE;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < MAZE.length; y++) {

      for (let x = 0; x < MAZE[y].length; x++) {

        ctx.fillStyle = MAZE[y][x] === 1 ? "#444" : "#F5F5DC";

        ctx.fillRect(
          x * TILE_SIZE,
          y * TILE_SIZE,
          TILE_SIZE,
          TILE_SIZE
        );
      }
    }

    // Goal
    ctx.fillStyle = "#4caf50";

    ctx.fillRect(
      GOAL_POS.x * TILE_SIZE,
      GOAL_POS.y * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE
    );

    // Player
    ctx.fillStyle = "#2196f3";

    ctx.fillRect(
      player.x * TILE_SIZE,
      player.y * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE
    );

  }, [player, MAZE, GOAL_POS]);

  const handleAnalysis = async (time: number) => {

    setIsLoading(true);

    try {

      const result = await analyzeMazePerformance({
        timeTaken: time,
      });

      setAnalysis(result);

      const updated = [...allAnalyses, result];

      setAllAnalyses(updated);

      if (currentLevel === LEVELS.length - 1) {
        onGameComplete(updated);
      }

    } catch (e) {

      console.error("Analysis failed:", e);

    } finally {

      setIsLoading(false);
    }
  };

  const checkWin = useCallback(
    (newPos: { x: number; y: number }) => {

      if (
        newPos.x === GOAL_POS.x &&
        newPos.y === GOAL_POS.y
      ) {

        const end = Date.now();

        const total = Math.round(
          (end - (startTime ?? end)) / 1000
        );

        setTimeTaken(total);

        if (currentLevel < LEVELS.length - 1) {
          setGameState("level_won");
        } else {
          setGameState("game_won");
        }

        handleAnalysis(total);
      }
    },
    [GOAL_POS, startTime, currentLevel]
  );

  const movePlayer = useCallback(
    (dx: number, dy: number) => {

      if (gameState !== "playing") return;

      const newX = player.x + dx;

      const newY = player.y + dy;

      if (
        MAZE[newY] &&
        MAZE[newY][newX] === 0
      ) {

        const updatedPlayer = {
          x: newX,
          y: newY,
        };

        setPlayer(updatedPlayer);

        checkWin(updatedPlayer);
      }
    },
    [player, gameState, MAZE, checkWin]
  );

  useEffect(() => {

    drawMaze();

  }, [drawMaze]);

  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {

      if (gameState !== "playing") return;

      const keys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
      ];

      if (keys.includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === "ArrowUp") movePlayer(0, -1);

      if (e.key === "ArrowDown") movePlayer(0, 1);

      if (e.key === "ArrowLeft") movePlayer(-1, 0);

      if (e.key === "ArrowRight") movePlayer(1, 0);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };

  }, [movePlayer, gameState]);

  const startGame = () => {

    setCurrentLevel(0);

    setPlayer(LEVELS[0].start);

    setGameState("playing");

    setStartTime(Date.now());

    setTimeTaken(null);

    setAnalysis(null);

    setAllAnalyses([]);
  };

  const nextLevel = () => {

    const next = currentLevel + 1;

    if (next < LEVELS.length) {

      setCurrentLevel(next);

      setPlayer(LEVELS[next].start);

      setGameState("playing");

      setStartTime(Date.now());

      setTimeTaken(null);

      setAnalysis(null);
    }
  };

  const GameStatus = () => {

    switch (gameState) {

      case "idle":

        return (
          <Button onClick={startGame}>
            {t("mazeGame.button_start")}
          </Button>
        );

      case "playing":

        return (
          <div className="flex items-center gap-2 text-muted-foreground">
            <p>{t("mazeGame.instruction")}</p>
            <SpeakAloudButton
              textToSpeak={t("mazeGame.instruction")}
            />
          </div>
        );

      case "level_won":

      case "game_won":

        return (
          <div className="w-full text-left space-y-4">

            <p className="font-semibold text-lg text-center">
              {t("mazeGame.win_message", { timeTaken })}
            </p>

            {isLoading && (
              <Loader2 className="h-6 w-6 animate-spin mx-auto" />
            )}

            {analysis && (
              <Alert
                variant="default"
                className="bg-blue-50 border-blue-200"
              >
                <User className="h-4 w-4" />

                <AlertTitle>
                  {t("mazeGame.analysis_title")}
                </AlertTitle>

                <AlertDescription>
                  {analysis.performanceSummary}
                </AlertDescription>
              </Alert>
            )}

            {gameState === "level_won" && (
              <Button onClick={nextLevel} className="w-full">
                Next Level
              </Button>
            )}

            {gameState === "game_won" && (
              <p className="font-semibold text-green-600 text-center">
                Congratulations! You completed all levels.
              </p>
            )}

            <Button
              onClick={startGame}
              variant="outline"
              className="w-full"
            >
              {t("mazeGame.button_restart")}
            </Button>

          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="h-full w-full bg-transparent border-0 shadow-none">

      <CardHeader>

        <CardTitle className="flex items-center justify-between gap-2">

          <div className="flex items-center gap-2">

            <Route className="text-primary" />

            {t("mazeGame.title")}

          </div>

          {gameState !== "idle" && (
            <span className="text-sm font-medium text-muted-foreground">
              Level: {currentLevel + 1} / {LEVELS.length}
            </span>
          )}

        </CardTitle>

        <div className="flex items-center gap-2">

          <CardDescription>
            {t("mazeGame.test_purpose")}
          </CardDescription>

          <SpeakAloudButton
            textToSpeak={t("mazeGame.test_purpose")}
          />

        </div>

      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center gap-4">

        <canvas
          ref={canvasRef}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#F5F5DC",
          }}
        />

        <GameStatus />

      </CardContent>

    </Card>
  );
}