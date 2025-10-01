

export const getNowPlayingShows=async (requestAnimationFrame,res)=>{
    try{

        await axios.get('https://api.themoviedb.org/3/movie/now_playing',{Headers:{Authorization:
            `Bearer${process.env.TMDB_API_KEY}`}
        
        })
 const movies = data.results;
 res.json({sucess:true,movies:movies})
    }  catch(error){

        console.error(error);
        res.json({sucess:false,message:error.message})
    }
}