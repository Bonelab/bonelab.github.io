class PointPicker {
    setReaderContents(contents) {
        // Create HTML elements
        const body = document.querySelector('body');
        
        const pointPickerDiv = document.createElement('div');
        pointPickerDiv.setAttribute('class', 'point-picker-container');
        body.appendChild(pointPickerDiv);

        const canvas = document.createElement('canvas');
        canvas.setAttribute('class', 'render-window');
        pointPickerDiv.appendChild(canvas);

        const informationDiv = document.createElement('div');
        informationDiv.setAttribute('class', 'controller');
        informationDiv.innerHTML = "Hello World"
        pointPickerDiv.appendChild(informationDiv);

        // Setup pipeline
        this.reader = vtk.IO.Geometry.vtkSTLReader.newInstance();
        this.reader.parseAsArrayBuffer(contents);
        // this.reader.parseAsText(contents);

        this.mapper = vtk.Rendering.Core.vtkMapper.newInstance();
        this.mapper.setInputConnection(this.reader.getOutputPort());

        // this.sphere = vtk.Filters.Sources.vtkSphereSource.newInstance();
        // this.mapper.setInputConnection(this.sphere.getOutputPort());

        this.actor = vtk.Rendering.Core.vtkActor.newInstance();
        this.actor.setMapper(this.mapper);

        this.renderer = vtk.Rendering.Core.vtkRenderer.newInstance();
        this.renderer.addActor(this.actor);

        this.renderWindow = vtk.Rendering.Core.vtkRenderWindow.newInstance();
        this.renderWindow.addRenderer(this.renderer);

        // OpenGlRenderWindow
        this.openGLRenderWindow = vtk.Rendering.OpenGL.vtkRenderWindow.newInstance({canvas: canvas});
        this.renderWindow.addView(this.openGLRenderWindow);

        // Interactor
        this.interactor = vtk.Rendering.Core.vtkRenderWindowInteractor.newInstance();
        this.interactor.setInteractorStyle(
            vtk.Interaction.Style.vtkInteractorStyleTrackballCamera.newInstance()
        );
        this.interactor.setView(this.openGLRenderWindow);
        this.interactor.initialize();
        this.interactor.bindEvents(canvas);

        this.renderer.setBackground(0., 0., 0.); 

        this.renderer.resetCamera();
        this.renderWindow.render();

        // Setup point picker
        this.picker = vtk.Rendering.Core.vtkPointPicker.newInstance();
        this.picker.setPickFromList(1);
        this.picker.initializePickList();
        this.picker.addPickList(this.actor);

        this.renderWindow.getInteractor().onRightButtonPress((callData) => {
            if (this.renderer !== callData.pokedRenderer) {
              return;
            }
          
            const pos = callData.position;
            const point = [pos.x, pos.y, 0.0];
            console.log(`Pick at: ${point}`);
            this.picker.pick(point, this.renderer);
          
            if (this.picker.getActors().length === 0) {
              const pickedPoint = this.picker.getPickPosition();
              console.log(`No point picked, default: ${pickedPoint}`);
              const sphere = vtk.Filters.Sources.vtkSphereSource.newInstance();
              sphere.setCenter(pickedPoint);
              sphere.setRadius(1.0);
              const sphereMapper = vtk.Rendering.Core.vtkMapper.newInstance();
              sphereMapper.setInputData(sphere.getOutputData());
              const sphereActor = vtk.Rendering.Core.vtkActor.newInstance();
              sphereActor.setMapper(sphereMapper);
              sphereActor.getProperty().setColor(1.0, 0.0, 0.0);
              this.renderer.addActor(sphereActor);
            } else {
              const pickedPointId = this.picker.getPointId();
              console.log('Picked point: ', pickedPointId);
          
              const pickedPoints = this.picker.getPickedPositions();
              for (let i = 0; i < pickedPoints.length; i++) {
                const pickedPoint = pickedPoints[i];
                console.log(`Picked: ${pickedPoint}`);
                const sphere = vtk.Filters.Sources.vtkSphereSource.newInstance();
                sphere.setCenter(pickedPoint);
                sphere.setRadius(1.0);
                const sphereMapper = vtk.Rendering.Core.vtkMapper.newInstance();
                sphereMapper.setInputData(sphere.getOutputData());
                const sphereActor = vtk.Rendering.Core.vtkActor.newInstance();
                sphereActor.setMapper(sphereMapper);
                sphereActor.getProperty().setColor(0.0, 1.0, 0.0);
                this.renderer.addActor(sphereActor);
              }
            }
            this.renderWindow.render();
          });
    }
}
pointPicker = new PointPicker();

function readFile(filename) {
    // Read file
    const fileReader = new FileReader();
    fileReader.onload = function onLoad(e) {
        pointPicker.setReaderContents(fileReader.result);
    };
    fileReader.onabort = setup;
    fileReader.readAsArrayBuffer(filename);
    // fileReader.readAsText(filename);
}

function setup() {
    // Create upload information
    const myContainer = document.querySelector('body');
    const uploadContainer = document.createElement('div');
    uploadContainer.setAttribute('class', 'container');

    // Image and Text
    const uploadImage = document.createElement('img')
    uploadImage.setAttribute('class', 'item');
    uploadImage.setAttribute('src', '../resources/bonelab-logo.png');

    const uploadText = document.createElement('div');
    uploadText.setAttribute('class', 'item');
    uploadText.innerHTML = 'Drag and Drop';

    uploadContainer.appendChild(uploadImage);
    uploadContainer.appendChild(uploadText);
    myContainer.appendChild(uploadContainer);

    // Setup drag and drop
    uploadContainer.addEventListener('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });

    uploadContainer.addEventListener('drop', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var files = e.dataTransfer.files; 
        if (files.length === 1) {
            myContainer.removeChild(uploadContainer);
            readFile(files[0]);
        } else {
            alert("Please provide only one file");
        }
    });
}
setup()
