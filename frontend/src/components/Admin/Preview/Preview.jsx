import Header from './Header';
import Divider from '../../shared/Divider';
import RenderItem from './RenderItem';

const Preview = ({data}) => {
    return (
        <>
           <div style={{ padding: "10px 100px" }}>
               <Header name={"Превью"} type={"header"}/>
               <Header name={data.name} type="eventName"/>
               {data.template.map((item) => (
                    <RenderItem item={item}/>
               ))}
           </div>
        </>
    )
}

export default Preview