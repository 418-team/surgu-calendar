import Header from './Header';
import RenderItem from './RenderItem';

const Preview = ({data}) => {
    return (
        <>
           <div style={{ padding: "10px 100px" }}>
               <Header name={"Превью"} type={"header"} style={{ fontSize: "28px" }}/>
               <div style={{ border: "1px solid black", padding: "10px 25px" }}>
               <Header name={data.title} type="eventName"/>
               {data?.data?.map((item) => (
                    <RenderItem item={item}/>
               ))}
               </div>
           </div>
        </>
    )
}

export default Preview