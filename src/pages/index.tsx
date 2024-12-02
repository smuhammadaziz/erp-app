import { FC, useState } from "react";
import { Layout } from "../layout/Layout";
import InnerLayoutSection from "../layout/InnerLayout/innerlayout";
import { NavLink } from "react-router-dom";
import {
	RiMoneyDollarCircleLine,
	RiCustomerService2Line,
	RiStore3Line,
} from "react-icons/ri";
import { BiTrendingUp } from "react-icons/bi";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	Legend,
);

import content from "../localization/content";
import useLang from "../hooks/useLang";

import InitialUserSettingsForHome from "../components/homePage/UserSettings";

const IndexPage: FC = () => {
	const [language, setLanguage] = useLang();
	const [filter, setFilter] = useState<string>(
		content[language as string].home.time.month,
	);

	const generateChartData = () => {
		let labels: string[] = [];
		let data: number[] = [];

		switch (filter) {
			case content[language as string].home.time.day:
				labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
				data = [10, 15, 12, 8, 20, 25, 18];
				break;
			case content[language as string].home.time.week:
				labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
				data = [50, 60, 40, 80];
				break;
			case content[language as string].home.time.month:
				labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
				data = [200, 250, 300, 150, 400, 350];
				break;
			case content[language as string].home.time.year:
				labels = ["2020", "2021", "2022", "2023"];
				data = [1200, 1350, 1100, 1500];
				break;
			default:
				labels = [];
				data = [];
		}

		return {
			labels,
			datasets: [
				{
					label: "Performance Data",
					data: data,
					fill: true,
					backgroundColor: "rgba(99, 102, 241, 0.1)",
					borderColor: "rgba(99, 102, 241, 1)",
					pointBackgroundColor: "rgba(99, 102, 241, 1)",
					pointBorderColor: "#fff",
					pointHoverBackgroundColor: "#fff",
					pointHoverBorderColor: "rgba(99, 102, 241, 1)",
					tension: 0.4,
				},
			],
		};
	};

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilter(e.target.value);
	};

	return (
		<Layout>
			<InnerLayoutSection>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-indigo-500 transition-all duration-300">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-500 text-sm">
									{
										content[language as string].home
											.totalSales
									}
								</p>
								<h3 className="text-2xl font-bold text-gray-800">
									$24,780
								</h3>
								<p className="text-green-500 text-sm mt-2 flex items-center">
									<BiTrendingUp className="mr-1" />
									+12.5%
								</p>
							</div>
							<div className="bg-indigo-100 p-3 rounded-lg">
								<RiMoneyDollarCircleLine className="text-2xl text-indigo-600" />
							</div>
						</div>
						<div className="mt-6">
							<NavLink
								to="/sales"
								className="flex items-center gap-3 py-3 px-8 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
							>
								<RiMoneyDollarCircleLine className="text-xl" />
								<span className="font-medium text-center">
									{
										content[language as string].home
											.salesDashboard
									}
								</span>
							</NavLink>
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-indigo-500 transition-all duration-300">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-500 text-sm">
									{
										content[language as string].home
											.activeClient
									}
								</p>
								<h3 className="text-2xl font-bold text-gray-800">
									1,482
								</h3>
								<p className="text-green-500 text-sm mt-2 flex items-center">
									<BiTrendingUp className="mr-1" />
									+8.1%
								</p>
							</div>
							<div className="bg-indigo-100 p-3 rounded-lg">
								<RiCustomerService2Line className="text-2xl text-indigo-600" />
							</div>
						</div>
						<div className="mt-6">
							<NavLink
								to="/customers"
								className="flex items-center gap-3 py-3 px-8 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
							>
								<RiCustomerService2Line className="text-xl" />
								<span className="font-medium">
									{
										content[language as string].home
											.clientManagement
									}
								</span>
							</NavLink>
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-indigo-500 transition-all duration-300">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-500 text-sm">
									{content[language as string].home.products}
								</p>
								<h3 className="text-2xl font-bold text-gray-800">
									324
								</h3>
								<p className="text-green-500 text-sm mt-2 flex items-center">
									<BiTrendingUp className="mr-1" />
									+5.3%
								</p>
							</div>
							<div className="bg-indigo-100 p-3 rounded-lg">
								<RiStore3Line className="text-2xl text-indigo-600" />
							</div>
						</div>
						<div className="mt-6">
							<NavLink
								to="/products"
								className="flex items-center gap-3 py-3 px-8 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
							>
								<RiStore3Line className="text-xl" />
								<span className="font-medium">
									{
										content[language as string].home
											.productCatalog
									}
								</span>
							</NavLink>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl w-[50%] h-[51vh] shadow-lg p-6 mt-8 border border-gray-100">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-lg font-bold text-gray-800">
							{content[language as string].home.salesChart}
						</h3>
						<div className="flex gap-2">
							{[
								content[language as string].home.time.day,
								content[language as string].home.time.week,
								content[language as string].home.time.month,
								content[language as string].home.time.year,
							].map((type) => (
								<button
									key={type}
									onClick={() => setFilter(type)}
									className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
										filter === type
											? "bg-indigo-600 text-white shadow-md"
											: "bg-gray-100 text-gray-600 hover:bg-gray-200"
									}`}
								>
									{type.charAt(0).toUpperCase() +
										type.slice(1)}
								</button>
							))}
						</div>
					</div>
					<div className="h-[35vh] w-[100%]">
						<Line data={generateChartData()} />
					</div>
				</div>

				<div>
					<NavLink to="/intro">intro</NavLink>
				</div>
				<div>
					<InitialUserSettingsForHome />
				</div>
			</InnerLayoutSection>
		</Layout>
	);
};

export default IndexPage;
