interface Props {
    item_link: string, 
    item_text: string
}

export function HeaderItem({item_link, item_text}: Props){
    return(
        <li className="select-none">
            <a href={item_link} className="select-none">
                {item_text}
            </a>
        </li>
    );
}