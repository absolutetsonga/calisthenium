"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

// Import the WorkoutForm component
import WorkoutForm from "~/components/ui/workout-form";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-primary mb-8 text-center text-4xl font-bold">
        Calisthenium Dashboard
      </h1>

      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <ProgressCard />
        <TopPerformersCard />
      </div>

      <Button
        onClick={() => setIsOpen(true)}
        className="bg-primary text-primary-foreground hover:bg-primary/90 transform rounded-full px-6 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
      >
        Log New Workout
      </Button>

      <WorkoutModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

const ProgressCard = () => {
  const progressData = [
    { day: "Mon", pullups: 10 },
    { day: "Tue", pullups: 12 },
    { day: "Wed", pullups: 8 },
    { day: "Thu", pullups: 15 },
    { day: "Fri", pullups: 20 },
    { day: "Sat", pullups: 18 },
    { day: "Sun", pullups: 25 },
  ];

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="pullups"
              stroke="#4ade80"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-primary mt-4 text-center text-xl font-semibold">
          Great Progress! Keep It Up 💪
        </p>
      </CardContent>
    </Card>
  );
};

const TopPerformersCard = () => {
  const activeUsers = [
    { rank: 1, name: "John Doe", pullups: 100 },
    { rank: 2, name: "Jane Smith", pullups: 95 },
    { rank: 3, name: "Bob Johnson", pullups: 90 },
    { rank: 4, name: "Alice Brown", pullups: 85 },
    { rank: 5, name: "Charlie Davis", pullups: 80 },
  ];

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Top Pull-up Performers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Pull-ups</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeUsers.map((user) => (
              <TableRow key={user.rank}>
                <TableCell className="font-medium">{user.rank}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell className="text-right">{user.pullups}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

type WorkoutModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const WorkoutModal = ({ isOpen, setIsOpen }: WorkoutModalProps) => {
  return isOpen ? (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-20">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <WorkoutForm setIsOpen={setIsOpen} />
        </motion.div>
      </AnimatePresence>
    </div>
  ) : null;
};
