import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uptpvmxwjuebttlwpbkz.supabase.co';
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const insertData = async ( data ) => {
  const { error, data: inserted } = await supabase.from('users_data').insert({
    nom: data["Nom"],
    prenom: data["Prénom"],
    quartier: data["Quartier"],
    telephone: data["Téléphone"],
    baptise: data["Baptise_par_Immersion"],
    passage: data["De_passage"],
    eglise: data["Eglise_d_origine"],
    email: data["Email"],
    connaissance: data["Moyen_de_connaissance"],
    nationalite: data["Nationalité"],
    profession: data["Profession"],
  });

  return { error, inserted };
};


const fetchData = async (number = 10) => {
  const { data, error } = await supabase
    .from('users_data')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(number);

  return { data, error };
};

const updateData = async ( newData ) => {
  const { data: updated, error } = await supabase
    .from('users_data')
    .update({
      nom: newData["Nom"],
      prenom: newData["Prénom"],
      quartier: newData["Quartier"],
      telephone: newData["Téléphone"],
      baptise: newData["Baptise_par_Immersion"],
      passage: newData["De_passage"],
      eglise: newData["Eglise_d_origine"],
      email: newData["Email"],
      connaissance: newData["Moyen_de_connaissance"],
      nationalite: newData["Nationalité"],
      profession: newData["Profession"],
    })
    .eq('id', newData["id"]);

  return { error, updated };
};

const fetchAnalyticsData = async () => {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const { data, error } = await supabase
    .from('users_data')
    .select('*')
    .gte('created_at', oneYearAgo.toISOString())
    .order('created_at', { ascending: false })
    .limit(1000);

  return { data, error };
};

export { fetchData, insertData, updateData, fetchAnalyticsData, supabase };