import styled from "styled-components";

function AuthField(props){
    const {
        name,
        type, 
        placeholder,
        accept,
        onChange,
        text,
        color
    } = props;

    return (
        <Div>
            <Label htmlFor={name} color={color}>{text}</Label>
            <Input
                name={name}
                type={type} 
                id={name}
                placeholder={placeholder}
                onChange={onChange}
                autoComplete="off"
                accept={accept}
                color={color}
                required
            />
        </Div>
        );
}

const Div = styled.div`
    margin: 50px 0px 0px 0px;
    position: relative;
`;

const Label = styled.label`
    position: absolute;
    top: -30px;
    color: ${(props)=>props.color};
`;

const Input = styled.input.attrs({
    placeholderTextColor : "rgb(165, 156, 156)"
})`
    outline: none;
    border: none;
    border-bottom: 1px solid ${(props)=>props.color};
    background-color: transparent;
    width: 80%;
    padding-left: 3px;
    padding-bottom: 8px;
    color: ${(props)=>props.color};
`;



export default AuthField;