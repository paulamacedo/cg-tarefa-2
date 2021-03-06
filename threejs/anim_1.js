function WaveAnimation() {}

Object.assign( WaveAnimation.prototype, {

    init: function() {
        let upperArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/2}, 500) //Alterado o theta dado pelo trabalho para pi/2
            .onUpdate(function(){
                // This is an example of rotation of the right_upper_arm 
                // Notice that the transform is M = T * R 
                let right_upper_arm = robot.getObjectByName("right_upper_arm");
                right_upper_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(2.8, 1.5, 0 ) );
                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })
        
        //Movimentar right_lower_arm rotacionar pi (se em relação ao torso) ou pi/2 (se em relação ao upper_arm) e transladar(posiçãoatual + comprimentodoupper, posiçãoatual + larguradoupper)
        let lowerArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/2}, 500) //Alterado o theta dado pelo trabalho para pi/2
            .onUpdate(function(){
                // This is an example of rotation of the right_upper_arm 
                // Notice that the transform is M = T * R 
                let right_lower_arm = robot.getObjectByName("right_upper_arm").children[0];
                right_lower_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(2, -1.5, 0 ) );
                // Updating final world matrix (with parent transforms) - mandatory
                right_lower_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        // Rotacionar mão
        let handTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/8}, 1000) //Alterado o theta dado pelo trabalho para pi/2
            .onUpdate(function(){
                // This is an example of rotation of the right_upper_arm 
                // Notice that the transform is M = T * R 
                let right_hand = robot.getObjectByName("right_upper_arm").children[0].children[0];
                right_hand.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(0, -1.5, 0 ) );
                // Updating final world matrix (with parent transforms) - mandatory
                right_hand.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })
        
        lowerArmTween.chain(handTween);
        upperArmTween.chain(lowerArmTween);
        upperArmTween.start();
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




