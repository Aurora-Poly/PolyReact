import styled from "styled-components";

function Input(props){
    const {
        name,
        type, 
        placeholder,
        accept,
        onChange,
        value,
        text,
        color,
        margin,
        padding,
        fontsize,
        border,
        width,
        height,
        multi_line,
        multiple,
        required,
        cols,
        rows,
        borderRadius
    } = props;

    if(multi_line){ //textarea
        return(
            <Div margin={margin} padding={padding} multi_line>
                <Label htmlFor={name} color={color} fontsize={fontsize}>{text}</Label>
                <Tarea
                    name={name}
                    cols={cols}
                    rows={rows}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    color={color}
                    padding={padding}
                    width={width}
                    height={height}
                    border={border}
                    multiple={multiple}
                    borderRadius={borderRadius}
                />
            </Div>
        )
    };

    if(required){ //input - required (auth)
        return(
            <Div margin={margin} padding={padding}>
                <Label htmlFor={name} color={color} fontsize={fontsize}>{text}</Label>
                <InputField
                    name={name}
                    cols={cols}
                    rows={rows}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    color={color}
                    padding={padding}
                    width={width}
                    height={height}
                    border={border}
                    multiple={multiple}
                    required
                    autocomplete="off"
                    borderRadius={borderRadius}
                    />
            </Div>
        )
    };

    return(
        <Div margin={margin} padding={padding}>
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
                padding={padding}
                width={width}
                height={height}
                border={border}
                borderRadius={borderRadius}
            />
        </Div>
        );

}

Input.defaultProps = {
    fontSize : "18px",
    width: "400px",
    height : "30px",
    color : "#000",
    margin: "5px 0",
    padding: "5px 15px",
    border: "1px solid #adb5bd",
    color: "#2e4057",
};

const Div = styled.div`
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    margin: ${(props)=>props.margin};
`;

const Tarea = styled.textarea`
    outline: 0;
    margin-right: 10px;
    padding: 10px 10px;
    width: ${(props)=>props.width};
    border: ${(props)=>props.border};
    border-radius: ${(props)=>props.borderRadius};

    &:focus{
        border: 2px solid rgb(113,136,208);
    }
`;

const Label = styled.label`
    margin-left: 10px;
    margin-right: 10px;
    font-weight: 600;
    text-align: left;
    padding: 5px 0; 
    font-size: ${(props)=>props.fontsize};
    color: ${(props)=>props.color};
`;
const InputField = styled.input.attrs({
    placeholderTextColor : "#000"
})`
   width: ${(props)=>props.width};
   height: ${(props)=>props.height};
   padding-left: 5px;
   padding: ${(props)=>props.padding};
   color: ${(props)=>props.color};
   outline: 0;
   border: ${(props)=>props.border};
   border-radius: ${(props)=>props.borderRadius};
   margin-right: 10px;

   &:focus{
        border: 2px solid rgb(113,136,208);
    }
`;

export default Input;