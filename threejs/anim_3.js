function Gargalhar() {}

Object.assign( Gargalhar.prototype, {

    init: function() {

        function headTween(){
            return new TWEEN.Tween( {y:4.8} )
                .to( {y:5.2}, 500)
                .onUpdate(function(){
                    let head = robot.getObjectByName('head');
                    head.matrix.makeTranslation(0,this._object.y,0);
                    head.updateMatrixWorld(true);
                    stats.update();
                    renderer.render(scene, camera);    
                })
        }
       
        let hd = headTween();
        hd.repeat(10);
        hd.start();

  
       
    },
    animate: function(time) {
        window.requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    },
    run: function() {
        this.init();
        this.animate(0);
    }
});

