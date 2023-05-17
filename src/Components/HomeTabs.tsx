import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import CustomForm from "./MUI/CustomForm";
import MUIForm from "./MUI/MUIForm";
import ChakraForm from "./Chakra/ChakraForm";

const HomeTabs = () => {
	return (
		<Tabs variant="enclosed" sx={{}}>
			<TabList>
				<Tab>MUI</Tab>
				<Tab>Chakra UI</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<MUIForm />
				</TabPanel>
				<TabPanel>
					<ChakraForm />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default HomeTabs;
