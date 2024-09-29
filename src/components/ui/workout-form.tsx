"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Dumbbell, Target, Zap, XIcon } from "lucide-react";

type WorkoutFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function WorkoutForm({ setIsOpen }: WorkoutFormProps) {
  const [movement, setMovement] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    console.log("Workout logged:", { movement, reps, sets });
  };

  return (
    <div className="bg-background text-foreground flex min-h-screen items-center justify-center">
      <Card className="border-primary/20 absolute w-[350px] overflow-hidden shadow-lg">
        <button onClick={() => setIsOpen(false)}>
          <XIcon className={"absolute right-2 top-2"} />
        </button>
        <CardHeader className="relative">
          <CardTitle className="text-primary text-center text-3xl font-bold">
            Calisthenium
            <Dumbbell className="text-primary ml-2 inline-block" />
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="movement"
                className="text-primary flex items-center text-sm font-medium"
              >
                <Zap className="text-primary mr-2 h-4 w-4" />
                Movement
              </Label>
              <Select onValueChange={setMovement} required>
                <SelectTrigger
                  id="movement"
                  className="bg-card text-card-foreground border-input focus:ring-ring focus:ring-2"
                >
                  <SelectValue placeholder="Select a movement" />
                </SelectTrigger>
                <SelectContent className="bg-card text-card-foreground border-input">
                  <SelectItem value="pushups">Pushups</SelectItem>
                  <SelectItem value="pullups">Pull-ups</SelectItem>
                  <SelectItem value="dips">Dips</SelectItem>
                  <SelectItem value="squats">Squats</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1 space-y-2">
                <Label
                  htmlFor="reps"
                  className="text-primary flex items-center text-sm font-medium"
                >
                  <Target className="text-primary mr-2 h-4 w-4" />
                  Reps
                </Label>
                <Input
                  id="reps"
                  type="number"
                  min="1"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  required
                  className="bg-card text-card-foreground border-input focus:ring-ring focus:ring-2"
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label
                  htmlFor="sets"
                  className="text-primary flex items-center text-sm font-medium"
                >
                  <Zap className="text-primary mr-2 h-4 w-4" />
                  Sets
                </Label>
                <Input
                  id="sets"
                  type="number"
                  min="1"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                  required
                  className="bg-card text-card-foreground border-input focus:ring-ring focus:ring-2"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full transform rounded-full py-3 font-bold transition-all duration-300 hover:scale-105"
            >
              Log Workout 💪
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
