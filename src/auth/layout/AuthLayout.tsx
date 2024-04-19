import "../../scss/auth/pages/Login.scss";

export const AuthLayout = ({children, title =""}: {children: React.ReactNode, title: string}) => {
    return (
        <div className="container__login">
            <h1>{title}</h1>
            {children}
        </div>
    )
}
