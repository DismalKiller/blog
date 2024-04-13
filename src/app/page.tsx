import HomeCard from "@/components/HomeCard";
import Timer from "@/components/Timer";

export default function Home() {
  const now = new Date();
  return (
    <>
      <div className="p-10 h-[90vh] flex items-center justify-center">
        <div className="flex flex-wrap gap-5 w-1/2 ">
          <HomeCard>
            <Timer />
          </HomeCard>
          <HomeCard>
            <div className="h-52 w-56 flex justify-center items-center">
              666
            </div>
          </HomeCard>
          <HomeCard>
            <div className="h-52 w-56 flex justify-center items-center">
              666
            </div>
          </HomeCard>
          <HomeCard>
            <div className="h-52 w-56 flex justify-center items-center">
              666
            </div>
          </HomeCard>
        </div>
      </div>
    </>
  );
}
