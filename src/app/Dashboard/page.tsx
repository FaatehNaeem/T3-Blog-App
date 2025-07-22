import Link from "next/link";

export default function Page() {

  const features = [
    {feature:"g POST",redirectUrl:"create-blog"},
    {feature:"SAVED BLOGS",redirectUrl:"saved-blogs"},
    {feature:"YOUR BLOGS",redirectUrl:"your-blogs"},
  ]
  return (
    <section className="p-8">
      <div className="mt-4 flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              {features.map((feature,index)=>(
          <Link key={index} href={`/Dashboard/${feature.redirectUrl}`}>
            <div className="flex aspect-video items-center justify-center rounded-xl bg-gradient-to-b from-card to-foreground text-white hover:bg-gradient-to-t">
                <h1 className="text-3xl font-bold">{feature.feature}</h1>
            </div>
          </Link> 
              ))}
        </div>
      </div>
    </section>
  );
}
