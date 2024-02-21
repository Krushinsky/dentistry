async function show(){
  const res = await fetch('https://raw.githubusercontent.com/Krushinsky/jsonFile/main/index.json');
  const resReceived = await res.json();
  showAll(resReceived);
}

function showAll(resReceived){
  const services = resReceived.services;
  const treeContainer = document.getElementById('tree');
  const tree = buildTree(services, null);
  treeContainer.appendChild(tree);
}

function buildTree(services, parentId) {
    const ul = document.createElement('ul');
    services
        .filter(service => service.head === parentId)
        .sort((a, b) => a.sorthead - b.sorthead)
        .forEach(service => {
            const li = document.createElement('li');
            li.textContent = `${service.name} (${service.price})`;
            ul.appendChild(li);
            if (service.node === 1) {
                const subTree = buildTree(services, service.id);
                li.appendChild(subTree);
            }
        });
    return ul;
}

show();