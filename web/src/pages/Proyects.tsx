import useProyect from '../hooks/useProyect';
import ProyectPreview from '../components/ProyectPreview';


const Proyects = () => {
    const  {proyects} = useProyect();
    
  return (
    <>
        <h1 className='text-4xl font-black text-center'>Proyects</h1>
        <div >
            {proyects.length > 0 ? 
            proyects?.map(proyect => (
                <ProyectPreview key={proyect?._id} proyect={proyect}/>
            )) : <h1>No projects</h1>}
        </div>
    </>
  )
}

export default Proyects