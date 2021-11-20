import Header from './Header';
import TextField from './TextField';

const RenderItem = ({item}) => {
    if (item.type === "header"){
        return <Header name={item.value} type='header'/>
    }else if (item.type === "label"){
        return <Header name={item.value} type='label'/>
    } else if (item.type === "text") {
        return <TextField value={item.value}/>
    }
    else {
        return ""
    }
}

export default RenderItem