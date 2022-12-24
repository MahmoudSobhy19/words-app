import { CgSpinnerTwoAlt } from "react-icons/cg";

const Loader = () => {
  return ( 
    <div className='flex justify-center mt-20'>
      <CgSpinnerTwoAlt className='animate-spin text-5xl' />
    </div>
  );
}
 
export default Loader;