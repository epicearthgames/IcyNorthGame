(function(){
	console.log("Unity WebGL Resize Template by Gurveen Kapur - Epic Earth Games based on idea from simmer.");
    const q = (selector) => document.querySelector(selector);
    const gameContainer = q('#gameContainer');
    const initialDimensions = {width: parseInt(gameContainer.style.width, 10), height: parseInt(gameContainer.style.height, 10)};
    gameContainer.style.width = '100%';
    gameContainer.style.height = '100%';

    let gCanvasElement = null;

    const getCanvasFromMutationsList = (mutationsList) => {
        for (let mutationItem of mutationsList){
            for (let addedNode of mutationItem.addedNodes){
                if (addedNode.id === '#canvas'){
                    return addedNode;
                }
            }
        }
        return null;
    }

    const setDimensions = () => {
        gameContainer.style.position = 'absolute';
        gCanvasElement.style.display = 'none';
        var windowWidth = parseInt(window.getComputedStyle(gameContainer).width, 10);
        var windowHeight = parseInt(window.getComputedStyle(gameContainer).height, 10);
        var scale = Math.min(windowWidth / initialDimensions.width, windowHeight / initialDimensions.height);
        gCanvasElement.style.display = '';
       // gCanvasElement.style.maxWidth = '%UNITY_WIDTH%px';
       // gCanvasElement.style.maxHeight = '%UNITY_HEIGHT%px';

        var resizeWidth = Math.round(initialDimensions.width * scale * 100) / 100;
        var resizeHeight = Math.round(initialDimensions.height * scale * 100) / 100;
		

		/* PC only start
		
		// Begin - Code to set max width & height in Mobile browsers only
		
		if(!UnityLoader.SystemInfo.mobile){
			if(resizeWidth > 444){
				resizeWidth = '444';
			}
			if(resizeHeight > 700){
				resizeHeight = '700';
			}
		}
		
		// replace 444 with your preferred game width & 700 with your preferred game height for PC browsers 
		//(Note - Do not write px after dimensions.
		// End - Code to set max width & height in Mobile browsers only
		
		PC only end */
		
     gCanvasElement.style.width = resizeWidth + "px";
	 gCanvasElement.style.height = resizeHeight + "px";	 
    }

    window.setDimensions = setDimensions;

    const registerCanvasWatcher = () => {
        let debounceTimeout = null;
        const debouncedSetDimensions = () => {
            if (debounceTimeout !== null) {
                clearTimeout(debounceTimeout);
            }
            debounceTimeout = setTimeout(setDimensions, 200);
        }
        window.addEventListener('resize', debouncedSetDimensions, false);
        setDimensions();
    }

    window.UnityLoader.Error.handler = function () { }

    const i = 0;
    new MutationObserver(function (mutationsList) {
        const canvas = getCanvasFromMutationsList(mutationsList)
        if (canvas){
            gCanvasElement = canvas;
            registerCanvasWatcher();

            new MutationObserver(function (attributesMutation) {
                this.disconnect();
                setTimeout(setDimensions, 1)
            }).observe(canvas, {attributes:true});

            this.disconnect();
        }
    }).observe(gameContainer, {childList:true});

})();