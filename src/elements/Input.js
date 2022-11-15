import styled from "styled-components";

function Input(props){
    const {
        accept,
        color,
        cols,
        fontsize,
        lineheight,
        margin,
        padding,
        multi_line,
        multiple,
        file,
        must,
        name,
        onChange,
        placeholder,
        rows,
        type, 
        text,
        value,
        width,
        twidth,
        theight
    } = props;

    if(multi_line){ //textarea
        return(
            <InputContainer margin={margin} multi_line>
                <Label htmlFor={name} color={color} fontsize={fontsize}>{text}</Label>
                <Tarea
                    name={name}
                    cols={cols}
                    rows={rows}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    color={color}
                    twidth={twidth}
                    theight={theight}
                    multiple={multiple}
                    padding={padding}
                />
            </InputContainer>
        )
    };

    if(must){ 
        return(
            <InputContainer margin={margin}>
                <Label htmlFor={name} color={color} fontsize={fontsize}>{text}</Label>
                <InputField
                    must
                    name={name}
                    cols={cols}
                    rows={rows}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    color={color}
                    width={width}
                    lineheight={lineheight}
                    multiple={multiple}
                    padding={padding}
                    required
                    autocomplete="off"
                    />
            </InputContainer>
        )
    };

    if(file){ 
        return(
            <InputContainer margin={margin} file>
                <Label htmlFor={name} color={color} fontsize={fontsize}>{text}</Label>
                <InputField2
                    name={name}
                    type={type}
                    id={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    autoComplete="off"
                    accept={accept}
                    multiple={multiple}
                    color={color}
                    required
                    width={width}
                    lineheight={lineheight}
                    padding={padding}
                />
            </InputContainer>
        )
    };

    return(
        <InputContainer margin={margin}>
            <Label htmlFor={name} color={color} fontsize={fontsize}>{text}</Label>
            <InputField
                name={name}
                type={type} 
                id={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                autoComplete="off"
                accept={accept}
                multiple={multiple}
                color={color}
                required
                width={width}
                lineheight={lineheight}
                padding={padding}
            />
        </InputContainer>
        );

}

Input.defaultProps = {
    fontsize : "14px",
    width: "100%",
    lineheight : "50px",
};

const InputContainer = styled.div`
    margin: ${(props)=>props.margin};
    box-sizing: border-box;
    padding: 5px;
`;

const Tarea = styled.textarea`
    width: ${(props)=>props.width};
    padding: 10px 10px;
    outline: 0;
    border: 1px solid #e6e6e6;
    border-radius: 15px;

    &:hover{ border: 1px solid #868e96; }
    &:focus{ border: 1px solid rgb(113,136,208); }
`;

const Label = styled.label`
    display: block;
    margin: 10px 5px;
    font-weight: 600;
    font-size: ${(props)=>props.fontsize};
    color: ${(props)=>props.color};
`;

const InputField = styled.input.attrs({
    placeholderTextColor : "#000"
})`
   width: ${(props)=>props.width};
   lineheight: ${(props)=>props.lineheight};
   color: ${(props)=>props.color};
   outline: 0;
   border: 1px solid #e6e6e6;
   border-radius: 5px;
   box-sizing: border-box;
   padding: 10px;

   &:hover{ border: 1px solid #868e96; }
   &:focus{ border: 1px solid rgb(113,136,208); }
`;

const InputField2 = styled.input.attrs({
    placeholderTextColor : "#000"
})`
   width: ${(props)=>props.width};
   outline: 0;
   border: 0;
   box-sizing: border-box;
   padding: 10px;
`;

export default Input;