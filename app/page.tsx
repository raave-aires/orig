import { Header } from "./components/Header/Header";
import { HeaderItem } from "./components/Header/HeaderItem";

export default function Home() {
    return (
        <Header>
            <HeaderItem 
                item_link="https://google.com/"
                item_text="Google"
            />
            <HeaderItem 
                item_link="https://youtube.com/"
                item_text="YouTube"
            />
        </Header>
    );
}
