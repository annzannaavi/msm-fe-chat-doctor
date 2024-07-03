type DefineConstant = {
    [key: string]: {
        background: string;
        icon: string;
        color: string;
    };
};
export const notification:DefineConstant =
    {
        error : {
            background: 'bg-LightRed',
            icon : '/monetize/static/img/error-icon.svg',
            color: 'text-LightWhite'
        },
        warning : {
            background: 'bg-LightYellow',
            icon : '/monetize/static/img/warning-icon.svg',
            color: 'text-LightWhite'
        },
        success : {
            background: 'bg-LightGraphiteGreen',
            icon : '/monetize/static/img/success-icon.svg',
            color: 'text-TextGraphiteGreen'
        }
    }

export default notification


