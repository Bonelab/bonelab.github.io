// Setup pipeline
const reader = vtk.IO.Legacy.vtkPolyDataReader.newInstance();

const mapper = vtk.Rendering.Core.vtkMapper.newInstance();
mapper.setInputConnection(reader.getOutputPort());

const actor = vtk.Rendering.Core.vtkActor.newInstance();
actor.setMapper(mapper);

const fullScreenRenderer = vtk.Rendering.Misc.vtkFullScreenRenderWindow.newInstance();
const renderer = fullScreenRenderer.getRenderer();
renderer.addActor(actor);
renderer.setBackground(0., 0., 0.); 

var renderWindow = fullScreenRenderer.getRenderWindow();

// Fetch data
function setReaderData(fileContents) {
    // Set reader
    reader.parseAsText(fileContents);

    // Update contents
    renderer.resetCamera();
    renderWindow.render();
}

function fetchData(url) {
    // HttpDataAccessHelper = vtk.IO.Core.DataAccessHelper.HttpDataAccessHelper;
    HttpDataAccessHelper = vtk.IO.Core.DataAccessHelper.get();
    HttpDataAccessHelper.fetchText({}, url).then((binary) => {
        setReaderData(binary);
    });
}
fetchData('https://raw.githubusercontent.com/Bonelab/BonelabData/master/data/test25a.vtk')
//fetchData('https://raw.githubusercontent.com/Bonelab/BonelabData/master/data/tube.vtk')
