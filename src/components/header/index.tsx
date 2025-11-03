import { Button } from "@mui/material";
import { Link } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { AccountMenu } from "./avatar";
import { HeaderContainer, Logo, Nav } from "./style";

interface HeaderProps extends PropsWithChildren {
    children: React.ReactNode
    to?: string
    onToggleMode?: () => void
}

const HeaderComponent = ({ children }: HeaderProps) => {
    const onToggleMode = () => {
        const mode = localStorage.getItem("mode");
        if (mode === "light") {
            localStorage.setItem("mode", "dark");
        } else {
            localStorage.setItem("mode", "light");
        }
    }
    return (
        <HeaderContainer>
            <Logo>Meu App</Logo>
            <Nav>{children}</Nav>
            <AccountMenu />
        </HeaderContainer>
    );
}

const NavItem = ({ children, to }: HeaderProps) => {
    return (
        <Button component={Link} to={to} color="inherit">
            {children}
        </Button>
    );
}

export {
    HeaderComponent,
    NavItem
};
