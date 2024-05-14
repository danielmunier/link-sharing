"use client"

import { useState } from "react";

interface DropdownMenuProps {
    title: string
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({title}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
       <>
       </>
    )
}

export default DropdownMenu