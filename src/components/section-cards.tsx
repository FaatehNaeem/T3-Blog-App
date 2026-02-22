"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { motion } from "motion/react";
import { Eye, Bookmark, Share2, MousePointerClick } from "lucide-react";

const features = [
  {
    cardDesc: "Total Impressions",
    stats: "48.2k",
    icon: <Eye className="h-5 w-5 text-primary" />,
    gradient: "from-primary/10 to-transparent"
  },
  {
    cardDesc: "Total Saves",
    stats: "2.4k",
    icon: <Bookmark className="h-5 w-5 text-blue-500" />,
    gradient: "from-blue-500/10 to-transparent"
  },
  {
    cardDesc: "Total Shares",
    stats: "1.1k",
    icon: <Share2 className="h-5 w-5 text-purple-500" />,
    gradient: "from-purple-500/10 to-transparent"
  },
  {
    cardDesc: "Total Clicks",
    stats: "15.8k",
    icon: <MousePointerClick className="h-5 w-5 text-green-500" />,
    gradient: "from-green-500/10 to-transparent"
  },
];

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:px-6 xl:grid-cols-4">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
        >
          <Card className="relative overflow-hidden border-none bg-card/40 backdrop-blur-md shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-300">
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-50`} />
            <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
              <CardDescription className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {feature.cardDesc}
              </CardDescription>
              <div className="rounded-full bg-background/50 p-2 shadow-sm border border-border/50">
                {feature.icon}
              </div>
            </CardHeader>
            <CardHeader className="relative z-10 pt-0">
              <CardTitle className="text-3xl font-extrabold tracking-tight">
                {feature.stats}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-primary font-medium">+12.5%</span> from last month
              </p>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
