import { Container } from "@chakra-ui/react";
import "./App.css";
import HomeTabs from "./Components/HomeTabs";

function App() {
	return (
		<div className="App">
			<Container
				sx={{
					minW: "300px",
				}}
			>
				<HomeTabs />
			</Container>
		</div>
	);
}

export default App;
