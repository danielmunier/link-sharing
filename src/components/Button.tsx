interface ButtonProps {
    text: string;
    href?: string;
    className?: string
    onClick?: () => void
}
export const Button: React.FC<ButtonProps> = ({text, href, className, onClick}) => {
    return (
        <button onClick={onClick} className={` text-white font-boldrounded ${className}`}>
            <a className=" bg-blue-500 inline-block py-2 px-2 hover:bg-blue-700font-boldrounded" href={href}>
                {text}
            </a>
        </button>
    )
    
}