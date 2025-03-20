import Image from "next/image";

export const Card = ({imagem, nome, species, height, weight, scape} : {

    imagem: string;
    nome: string;
    species?: string;
    height?: string;
    weight?: string;
    scape?: string;
}) => {

    return (
        <>
    
        <div className="w-64 m-8 rounded-2xl  hover:shadow-md shadow-white  transition duration-500 ease-in-out">
            <div className="bg-[url('https://img.freepik.com/vetores-gratis/vetor-de-fundo-de-padrao-geometrico-branco-e-cinza_53876-136510.jpg')] object-contain flex justify-center w-full h-auto rounded-t-2xl shadow-lg shadow-yellow-900/50">
            <img className="w-48 h-72 object-contain hover:scale-125 transition duration-500 ease-in-out" src={imagem} width={200} height={200} alt="sla"/>
            </div>
            <div className="bg-amber-600 rounded-b-2xl p-2">
                <h2 className="capitalize font-bold text-white text-2xl m-1">{nome}</h2>
                { species && height ? (
                    <>
                        <h2 className="font-bold text-yellow-300 m-1">h {height} | w {weight}</h2>
                        <h2 className="font-bold text-white m-1">Specie: {species}</h2>
                        <h2 className="font-bold text-yellow-300 m-1">Type: {scape}</h2>
                    </>
                ) : (
                    <></>
                )}
                
            </div>
        </div>

        </>
      );
}   