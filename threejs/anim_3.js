function Gargalhar() {}

Object.assign( Gargalhar.prototype, {

    init: function() {

        function upperArmTween(arm, negative){
            return new TWEEN.Tween( {theta:0} )
                .to( {theta:negative ? -Math.PI/4 : Math.PI/4}, 500)
                .onUpdate(function(){
                    let upper_arm = robot.getObjectByName(arm);
                    upper_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(negative ? -2.8 : 2.8, 1, 0 ) );
                    upper_arm.updateMatrixWorld(true);
                    stats.update();
                    renderer.render(scene, camera);    
                })
        }

        function lowerArmTween(arm, negative){
            return new TWEEN.Tween( {theta:0} )
                .to( {theta:negative ? -Math.PI/2 : Math.PI/2}, 500)
                .onUpdate(function(){
                    let lower_arm = robot.getObjectByName(arm).children[0];
                    lower_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(negative ? -1 : 1, -2, 0 ) );
                    lower_arm.updateMatrixWorld(true);
                    stats.update();
                    renderer.render(scene, camera);    
                })
        }

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
       
        let right_upper_arm = upperArmTween('right_upper_arm', false);
        let right_lower_arm = lowerArmTween('right_upper_arm', true);
        let left_upper_arm = upperArmTween('left_upper_arm', true);
        let left_lower_arm = lowerArmTween('left_upper_arm', false);
        let hd = headTween();

        right_upper_arm.chain(right_lower_arm);
        left_upper_arm.chain(left_lower_arm);
        hd.repeat(10);
        
        right_upper_arm.start()
        left_upper_arm.start()
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

