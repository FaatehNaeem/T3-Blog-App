import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";


const features = [
  { cardDesc: "Total Impressions", stats:"$1,250.00",redirectUrl: "create-blog" },
  { cardDesc: "Total Saves", stats:"$1,250.00",redirectUrl: "saved-blogs" },
  { cardDesc: "Total Shares", stats:"$1,250.00", redirectUrl: "your-blogs" },
  { cardDesc: "Total Clicks", stats:"$1,250.00", redirectUrl: "your-blogs" },
];
export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:px-6 2xl:grid-cols-4">
      {features.map((feature,index)=>(
      <Card className="bg-gradient-to-r from-foreground to-black/80 text-white hover:bg-gradient-to-t" key={index}>
        <CardHeader className="relative">
          <CardDescription className="text-secondary">{feature.cardDesc}</CardDescription>
          <CardTitle className="card:text-3xl text-4xl font-semibold tabular-nums">
            {feature.stats}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <Link href={'#'} className="line-clamp-1 flex gap-2 font-medium">
           <Button>View Details</Button>
          </Link>
        </CardFooter>
      </Card>
      ))}
    

    </div>
  );
}
