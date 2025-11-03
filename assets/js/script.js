// Utilitários
function val(id){const e=document.getElementById(id); return e.value.trim();}
function num(id){const v=val(id); if(v==="") return null; return Number(v);}
function out(id,msg){document.getElementById(id).textContent = msg;}

// 1) 1..10
function e1(){
  let i=1, s=[];
  while(i<=10){ s.push(i); i++; }
  out("o1", s.join(" "));
}

// 2) soma 1..100
function e2(){
  let i=1, soma=0;
  while(i<=100){ soma+=i; i++; }
  out("o2", `Soma = ${soma}`);
}

// 3) pares 1..50
function e3(){
  let i=1, s=[];
  while(i<=50){ if(i%2===0) s.push(i); i++; }
  out("o3", s.join(" "));
}

// 4) média de 5 inteiros
function e4(){
  const ids=["e4a","e4b","e4c","e4d","e4e"];
  let i=0, soma=0, qtd=0;
  while(i<ids.length){
    const v = num(ids[i]);
    if(v===null) return out("o4","Preencha todos os 5 valores.");
    soma+=v; qtd++; i++;
  }
  out("o4", `Média = ${(soma/qtd).toFixed(2)}`);
}

// 5) tabuada até 10
function e5(){
  const n = num("e5n");
  if(n===null) return out("o5","Informe um número.");
  let i=1, linhas=[];
  while(i<=10){ linhas.push(`${n} x ${i} = ${n*i}`); i++; }
  out("o5", linhas.join("\n"));
}

// 6) divisores de N
function e6(){
  const n = num("e6n");
  if(n===null || n<=0) return out("o6","Informe inteiro positivo.");
  let i=1, s=[];
  while(i<=n){ if(n%i===0) s.push(i); i++; }
  out("o6", s.join(" "));
}

// 7) primo?
function e7(){
  const n = num("e7n");
  if(n===null || n<2) return out("o7","Informe inteiro ≥ 2.");
  let d=2, primo=true;
  while(d*d<=n && primo){
    if(n%d===0) primo=false;
    d++;
  }
  out("o7", primo ? "É primo" : "Não é primo");
}

// 8) fibonacci até N (≤ limite)
function e8(){
  const N = num("e8n");
  if(N===null || N<0) return out("o8","Informe N ≥ 0.");
  let a=0, b=1, s=[];
  while(a<=N){ s.push(a); const proximo=a+b; a=b; b=proximo; }
  out("o8", s.join(" "));
}

// 9) média idades de 5 pessoas
function e9(){
  const nomes=[val("e9n1"),val("e9n2"),val("e9n3"),val("e9n4"),val("e9n5")];
  const idIds=["e9i1","e9i2","e9i3","e9i4","e9i5"];
  let i=0, soma=0, qtd=0;
  while(i<idIds.length){
    const idade = num(idIds[i]);
    if(!nomes[i] || idade===null || idade<0) return out("o9","Preencha todos os nomes e idades válidas.");
    soma+=idade; qtd++; i++;
  }
  out("o9", `Média das idades = ${(soma/qtd).toFixed(2)}`);
}

// 10) primeiros 20 fibonacci
function e10(){
  let a=0, b=1, count=0, s=[];
  while(count<20){ s.push(a); const proximo=a+b; a=b; b=proximo; count++; }
  out("o10", s.join(" "));
}

// 11) soma pares de 1..N
function e11(){
  const N = num("e11n");
  if(N===null || N<1) return out("o11","Informe N ≥ 1.");
  let i=1, soma=0;
  while(i<=N){ if(i%2===0) soma+=i; i++; }
  out("o11", `Soma dos pares = ${soma}`);
}

// 12) ímpares 1..50
function e12(){
  let i=1, s=[];
  while(i<=50){ if(i%2!==0) s.push(i); i++; }
  out("o12", s.join(" "));
}

// 13) dígitos separados
function e13(){
  let n = num("e13n");
  if(n===null) return out("o13","Informe um inteiro.");
  const sign = n<0 ? "-" : "";
  n = Math.abs(Math.trunc(n));
  if(n===0) return out("o13","0");
  let digitos = [];
  while(n>0){
    digitos.push(n%10);
    n = Math.trunc(n/10);
  }
  digitos.reverse();
  out("o13", (sign?sign+" ":"") + digitos.join(" "));
}

// 14) fatorial
function e14(){
  const n = num("e14n");
  if(n===null || n<0) return out("o14","Informe inteiro ≥ 0.");
  let i=1, fat=1;
  while(i<=n){ fat*=i; i++; }
  out("o14", `${n}! = ${fat}`);
}

// 15) média de idades até 'fim'
let e15dados = []; // {nome, idade}
let e15encerrado = false;

function e15Adicionar(){
  if(e15encerrado) return out("o15","Entrada encerrada. Clique em Limpar para reiniciar.");
  const nome = val("e15nome");
  const idade = num("e15idade");
  if(!nome) return out("o15","Digite um nome (ou 'fim' para encerrar).");
  if(nome.toLowerCase()==="fim"){
    e15encerrado = true;
    out("o15","Entrada encerrada. Clique em Finalizar para calcular a média ou em Limpar para recomeçar.");
    return;
  }
  if(idade===null || idade<0) return out("o15","Informe uma idade válida.");
  e15dados.push({nome, idade});
  // Render tags
  const ul = document.getElementById("e15lista");
  const li = document.createElement("li");
  li.textContent = `${nome} (${idade})`;
  ul.appendChild(li);
  document.getElementById("e15nome").value="";
  document.getElementById("e15idade").value="";
  out("o15", `${e15dados.length} registro(s) adicionados.`);
}

function e15Finalizar(){
  if(!e15encerrado) return out("o15","Digite 'fim' como nome e clique em Adicionar para encerrar primeiro.");
  if(e15dados.length===0) return out("o15","Nenhum registro válido para calcular.");
  let i=0, soma=0;
  while(i<e15dados.length){ soma += e15dados[i].idade; i++; }
  const media = soma / e15dados.length;
  out("o15", `Média das idades = ${media.toFixed(2)} (base em ${e15dados.length} pessoa(s))`);
}

function e15Limpar(){
  e15dados=[]; e15encerrado=false;
  document.getElementById("e15lista").innerHTML="";
  document.getElementById("e15nome").value="";
  document.getElementById("e15idade").value="";
  out("o15","");
}
