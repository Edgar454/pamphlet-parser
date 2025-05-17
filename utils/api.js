import {useState, useEffect} from 'react';
import {
    GoogleGenAI,
    createUserContent,
    createPartFromUri,
    Type 
  } from "@google/genai";

import * as FileSystem from 'expo-file-system';


const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY });


export const useFetch = (image_uri) => {
    const [data , setData] = useState({});
    const  [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState(null);

    const prompt = "Read and parse the content from this form";


    
    const fetchData = async (image_uri) =>{
        setIsLoading(true);
        const base64 = await FileSystem.readAsStringAsync(image_uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          
        const imagePart = {
            inlineData: {
              data: base64,
              mimeType: 'image/jpeg',
            },
          };

        try{
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: [
                  createUserContent([
                    prompt,
                    imagePart,
                  ]),
                ],
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                'Nom': {
                                    type: Type.STRING,
                                    description: 'Name provided in the form',
                                    nullable: false,
                                },
                                'Prénom': {
                                    type: Type.STRING,
                                    description: 'First name provided in the form',
                                    nullable: false,
                                },
                                'Nationalité': {
                                    type: Type.STRING,
                                    description: 'Nationality provided in the form',
                                    nullable: false,
                                },
                                
                                'Profession': {
                                    type: Type.STRING,
                                    description: 'Profession provided in the form',
                                    nullable: false,
                                },
                             
                                'Téléphone': {
                                    type: Type.STRING,
                                    description: 'Phone number provided in the form',
                                    nullable: false,
                                },
                                'Email': {
                                    type: Type.STRING,
                                    description: 'Email provided in the form',
                                    nullable: false,
                                },
                                'Quartier': {
                                    type: Type.STRING,
                                    description: 'Quarter provided in the form',
                                    nullable: false,
                                },
                                'Eglise_d_origine': {
                                    type: Type.STRING,
                                    description: 'Name of the church of origin provided in the form',
                                    nullable: false,
                                },
                                'Baptise_par_Immersion': {
                                    type: Type.STRING,
                                    description: 'Baptism status provided in the form either yes or no',
                                    nullable: false,
                                },
                                'De_passage': {
                                    type: Type.STRING,
                                    description: 'De passage status provided in the form',
                                    nullable: false,
                                },
                                'Moyen_de_connaissance': {
                                    type: Type.STRING,
                                    description: 'Means of knowledge provided in the form',
                                    nullable: false,
                                },
                            },
                            required: ["Nom", "Prénom", "Nationalité", "Profession", "Téléphone", "Email", "Quartier", "Eglise_d_origine", "Baptise_par_Immersion", "De_passage", "Moyen_de_connaissance"],
                            
                        },
                    },
                },
              });
            setData(response.text);
            setIsLoading(false);

        }catch(err){
            setError(err);
            alert('There is an error');
        }finally{
            setIsLoading(false);
        }


    }

    useEffect(() => {
        if (image_uri) fetchData(image_uri);
      }, [image_uri]);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return {data,setData, isLoading, error, refetch};
}