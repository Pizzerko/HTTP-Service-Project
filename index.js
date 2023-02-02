/*Tools: code editor, browser, command line utility, 
application and server utility, API platform


Benson Zhou Period: 7-8 EVen 
*/

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(__dirname + "/public"));

let musicList = [
    {
        name: "Shake It Off",
        genre: "pop",
        month: "August",
        year: "2014",
    },
    {
        name: "Toxic",
        genre: "pop",
        month: "January",
        year: "2004"

    },
    {
        name: "Rich Spirit",
        genre: "hip hop",
        month: "May",
        year: "2022"
    },
    {
         
        name: "In da Club",
        genre: "hip hop",
        month: "January",
        year: "2003"
    },
    {
         
        name: "Violet",
        genre: "rap",
        month: "October",
        year: "2022"
    },
    {
        
        name: "KILLSHOT",
        genre: "rap",
        month: "September",
        year: "2018"
    },
    {
        
        name: "Eine kleine Nachtmusik",
        genre: "classical",
        month: "August",
        year: "1787"
    },
    {
  
        name: "Symphony No.5 in C minor",
        genre: "classical",
        month: "December",
        year: "1808"
    },
    {
      
        name: "Bohemian Rhapsody",
        genre: "rock",
        month: "October",
        year: "1975"
    },
    {
 
        name: "Thunder",
        genre: "rock",
        month: "April",
        year: "2017"
    },
    {
   
        name: "Fly Me To The Moon",
        genre: "jazz",
        month: "April",
        year: "1954"
    },
    {
  
        name: "West End Blues",
        genre: "jazz",
        month: "June",
        year: "1928"
    },
    {
   
        name: "Cross Road Blues",
        genre: "blues",
        month: "May ",
        year: "1937"
    },
    {
     
        name: "Slow Blues",
        genre: "blues",
        month: "November ",
        year: "1941"
    },
    {
     
        name: "Stranger",
        genre: "electronic",
        month: "April",
        year: "2021"
    },
    {
     
        name: "Alone",
        genre: "electronic",
        month: "July",
        year: "2016"
    },
]


function setIndexes()
{
    musicList = musicList.map((obj, index) =>
    {
        return ({id: index + 1, ...obj})
    })
}

setIndexes();

//=========== ROUTES FOR HTTP GET REQUESTS ==========

app.get('/', (req, res) => {

    res.sendFile("/index.html");

});

app.get('/api/musicList', (req, res) => {


   let playList = musicList;

   if (!req.body.month || !req.body.year)
   {
       if (req.body.month)   
       {
           playList = musicList.filter(s => s.month === req.body.month);
       }
       if (req.body.year)
       {
           playList = musicList.filter(s => s.year === req.body.year);
       } 
   }
   else if (req.body.month && req.body.year)
   {
       playList = musicList.filter(s => s.month === req.body.month && s.year === req.body.year);
   }
  
   
   if (playList.length == 0)
   {
       res.status(404).send("Couldn't find songs based on the query");
       return;
   }
   res.send(playList);

});

app.get('/api/musicList/:id', (req, res) => {
   const playList = musicList.find(s => s.id === parseInt(req.params.id));
   if (!playList)
   {
       res.status(404).send("Song not found");
       return;
   }
   return res.send(playList);

});




//=========== ROUTES FOR HTTP POST REQUESTS ==========
app.post('/api/musicList', (req, res) => {

   if (!req.body.name || !req.body.genre || !req.body.month || !req.body.year)
   {
       res.status(404).send("Missing name, genre, month, or year.");
       return;
   }

   if (req.body.name.length < 3 || req.body.name.length >= 40)
   {
       res.status(404).send("Name must have at least 3 characters or less than 40 characters ");
       return;
   }
   if (req.body.genre.length < 3 || req.body.genre.length >= 40)
   {
       res.status(404).send("Genre must have at least 3 characters or less than 40 characters ");
       return;
   }

   let song = {
       id: musicList.length + 1,
       name: req.body.name,
       genre: req.body.genre,
       month: req.body.month,
       year: req.body.year 
   }
   musicList.push(song);


   res.status(200).send(musicList);

});



//=========== ROUTES FOR HTTP PUT REQUESTS ==========

app.put('/api/musicList/:id', (req, res) => {

    if (!req.body.name || !req.body.genre || !req.body.month || !req.body.year)
    {
        res.status(404).send("Missing name, genre, month, or year.");
        return;
    }
   if (req.params.id < 0 || req.params.id > musicList.length)
   {
       res.status(400).send("Invalid id");
       return;
   }
   if (req.body.name.length < 3 || req.body.name.length >= 40)
   {
       res.status(404).send("Name must have at least 3 characters or less than 40 characters ");
       return;
   }
   if (req.body.genre.length < 3 || req.body.genre.length >= 40)
   {
       res.status(404).send("Genre must have at least 3 characters or less than 40 characters ");
       return;
   }

   musicList[req.params.id - 1] = {
       id: parseInt(req.params.id),
       name: req.body.name,
       genre: req.body.genre,
       month: req.body.month,
       year: req.body.year
   }
   

   res.status(200).send(musicList[req.params.id - 1]);
  

});


//=========== ROUTES FOR HTTP DELETE REQUESTS ==========
app.delete('/api/musicList/:id', (req, res) => {
   

   const song = musicList.find(s => s.id === parseInt(req.params.id));

   if (!song)
   {
       res.status(404).send("Song doesn't exist");
       return;
   }
   let objIndex = musicList.indexOf(song);
   
   musicList.splice(objIndex, 1);
   
   musicList.forEach((obj, index) =>
   {
       obj.id = index + 1;
   })

   res.status(200).send("Song deleted successfully");

});



app.listen(3000, () => { 
   console.log('app listening on port 3000\nhttp://localhost:3000'); 
});