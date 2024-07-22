import {LuckyWheelPage} from "@/app/pages/lucky/lucky-wheel-page"
import {LuckyGridPage} from "@/app/pages/lucky/lucky-grid-page"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="text-3xl font-bold text-center text-gray-800 my-8">
        大营销平台 - 抽奖展示
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-1/2 p-6 bf-white shadow-lg rouded-lg">
          <p className="text-gray-700">
            {/* <LuckyWheelPage/> */}
          </p>
          <LuckyWheelPage/>
        </div>
        <div className="w-full md:w-1/2 p-6 bf-white shadow-lg rounded-lg">
          <p className="text-gray-700">
            {/* <LuckyGridPage/> */}
          </p>
          <LuckyGridPage/>
        </div>
      </div>

      <footer className="text-gray-600 text-center my-8">
        大营销平台
      </footer>
    </div>
  );
}
