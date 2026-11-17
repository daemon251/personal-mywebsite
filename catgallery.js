//funnyCatImages

let currentGalleryStr = "catgifs";

function changeGallery(str)
{
	currentGalleryStr = str;
	resetGalleryButtonColors(false);
	
	let atom = document.getElementById("atom");
	let catgifs = document.getElementById("catgifs")
	
	arr = [atom, catgifs];
	for(let i = 0; i < arr.length; i++)
	{
		if(arr[i].id == str) {arr[i].style = "display:block"; continue;}
		arr[i].style = "display:none";
	}
}

//this is so shiiiiit
function resetGalleryButtonColors(forceUnhoverColor)
{
	let arr = ["changeToCatgifs", "changeToAtom"];
	for(let i = 0; i < arr.length; i++)
	{
		let str = arr[i];
		let button = document.getElementById(str);
		if(str.toLowerCase().indexOf(currentGalleryStr) >= 0) 
		{
			if(forceUnhoverColor)
			{
				button.style.color = getComputedStyle(document.documentElement).getPropertyValue('--color1a');
				button.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--color1a');
			}
			
			continue;
		}
			
		button.style.color = getComputedStyle(document.documentElement).getPropertyValue('--color1');
        button.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--color1');
		button.style.filter = "none";
	}
}

//this is probably repeated code
function addListenersToGalleryButton(button)
{
    button.addEventListener('mouseover', () => 
    {
        button.parentNode.style.filter = "hue-rotate(var(--hue-rotate)) brightness(var(--value)) saturate(var(--saturate)";
        if(currentGalleryStr == "catgifs" && button.textContent == "Cat Gifs" || currentGalleryStr == "atom" && button.textContent == "Atom")
        {
            button.style.filter = "none"; //it already gets applied from button
            button.style.color = '#ff5500aa';
            button.style.borderColor = '#ff5500aa'; 
        }
        else
        {
            button.style.filter = "none"; //it already gets applied from button
            button.style.color = '#ff5500ff';
			button.style.borderColor = '#ff5500ff'; 
        }
    });

    button.addEventListener("mouseout", (event) => 
    {
        button.parentNode.style.filter = "";
        if(currentGalleryStr == "catgifs" && button.textContent == "Cat Gifs" || currentGalleryStr == "atom" && button.textContent == "Atom")            
		{
            button.style.color = getComputedStyle(document.documentElement).getPropertyValue('--color1a');
            button.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--color1a');
        }
        else
        {
            button.style.color = getComputedStyle(document.documentElement).getPropertyValue('--color1');
            button.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--color1');
        }
    })
}

addListenersToGalleryButton(document.getElementById("changeToCatgifs"));
addListenersToGalleryButton(document.getElementById("changeToAtom"));