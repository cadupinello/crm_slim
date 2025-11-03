import styled from '@emotion/styled';

export const HeaderContainer = styled("header")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.palette.primary.contrastText,
  color: theme.palette.getContrastText(theme.palette.primary.contrastText),
  padding: theme.spacing(1, 2),
  boxShadow: theme.shadows[2],
}));

export const Logo = styled("h1")(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 600,
  letterSpacing: "1px",
}));

export const Nav = styled("nav")({
  display: "flex",
  gap: "20px",
});