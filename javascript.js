document.querySelector(".control-buttons span").onclick = function ()
{
    let yourname = prompt("What's Your Name?");
    if (yourname == null || yourname == "")
    {
        document.querySelector(".name span").textContent = "Unkown";
    } else
    {
        document.querySelector(".name span").textContent = yourname;
    }
    document.querySelector(".control-buttons").remove();
}
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);

// shuffle 
function shuffle(array)
{
    let current = array.length,
    temp, random;
    while (current > 0)
     
    {
        // get randomn
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;


    }
    return array;

}

// add order css to game blocks
blocks.forEach((block,index) => {
    
    block.style.order = orderRange[index];
    // add click event
    block.onclick = function ()
    {
        flip(block);
        }

});
// flip
function flip(selectedBlock)
{
    selectedBlock.classList.add("flipped");
    // collect all flipped
    let allflipped = blocks.filter(flippedblock => flippedblock.classList.contains("flipped"));
    if (allflipped.length==2)
    {
        // console.log("stop");
        stopclicking();
        matched(allflipped[0],allflipped[1]);

    }
}
function stopclicking()
{
    // add class noclicking
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => { 

  blocksContainer.classList.remove("no-clicking");
    },duration)
}

function matched(first,second)
{
    let tries = document.querySelector(".tries span");
    if (first.dataset.tech === second.dataset.tech)
    {
        first.classList.remove("flipped");
        second.classList.remove("flipped");
         first.classList.add("has-matched");
        second.classList.add("has-matched");
        document.getElementById("success").play();
    
    }
    else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        setTimeout(() => {
            first.classList.remove("flipped");
            second.classList.remove("flipped");
        }, duration);
        document.getElementById("fail").play();
       
    }
    if (parseInt(tries.innerHTML) === 5) {
        setTimeout(() => {
            alert("Game Over");
            location.reload(); // Optional: Restart game
        }, duration);
    }
}

