interface Props {
    item_link: string, 
    item_text: string
}

export function HeaderItem({item_link, item_text}: Props){
    return(
        <li>
            <a href={item_link}>
                {item_text}
            </a>
        </li>
    );
}