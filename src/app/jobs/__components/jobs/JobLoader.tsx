"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { motion } from "framer-motion";
export const JobLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <motion.div
          key={index}
          className="cursor-pointer"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
        >
          <Card className="flex flex-col animate-pulse">
            <CardHeader className="flex-grow space-y-2">
              <div className="h-10 w-10 bg-gray-300 rounded-md"></div>
              <div className="h-4 bg-gray-300 rounded-md w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded-md w-1/2"></div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="h-3 bg-gray-200 rounded-md w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded-md w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded-md w-2/3"></div>
            </CardContent>
            <CardFooter className="flex justify-between mt-auto">
              <div className="h-4 bg-gray-300 rounded-md w-16"></div>
              <div className="h-8 bg-gray-400 rounded-md w-20"></div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
