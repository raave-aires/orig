interface Props {
    item_link: string, 
    target: string,
    item_text: string,
}

export function HeaderItem({item_link, target, item_text}: Props){
    return(
        <li className="select-none">
            <a href={item_link} target={target} className="select-none">
                {item_text}
            </a>
        </li>
    );
}