import { Link, useNavigate } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brand } from './shell';
import { useYimiya } from './store';
import mark from '@/assets/yimiya-mark.png';
type AuthMode = 'login' | 'signup' | 'forgot' | 'reset';
export function AuthPage({ mode = 'login' }: { mode?: AuthMode }) {
  const [visible,setVisible] = useState(false);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirm,setConfirm] = useState('');
  const [name,setName] = useState('');
  const [done,setDone] = useState(false);
  const [error,setError] = useState('');
  const { demoLogin } = useYimiya();
  const navigate = useNavigate();
  const title = mode === 'login' ? 'Bem-vindo à Yimiya' : mode === 'signup' ? 'Seu próximo passo começa aqui' : mode === 'forgot' ? 'Recuperar senha' : 'Defina uma nova senha';
  const subtitle = mode === 'login' ? 'Suas ideias encontram novas possibilidades.' : mode === 'signup' ? 'Crie seu espaço para conversar com Miya.' : mode === 'forgot' ? 'Informe seu e-mail para continuar.' : 'Escolha uma senha com pelo menos 8 caracteres.';
  function submit(event: FormEvent) {
    event.preventDefault(); setError('');
    if (mode === 'reset') { if (password !== confirm) { setError('As senhas precisam ser iguais.'); return; } setDone(true); return; }
    if (mode === 'forgot') { setDone(true); return; }
    demoLogin(name, email); navigate({ to: '/' });
  }
  return <div className="auth-page"><div className="auth-brand"><Brand /></div><div className="auth-panel"><img className="auth-mark" src={mark} alt="" width={58} height={58} />{done ? <><div className="flex justify-center mb-5 text-primary"><CheckCircle2 className="size-9" /></div><h1>{mode === 'forgot' ? 'Solicitação demonstrada' : 'Tudo pronto para continuar'}</h1><p className="auth-subtitle">{mode === 'forgot' ? 'Nenhum e-mail foi enviado. A recuperação de senha será ativada quando o serviço de contas estiver conectado.' : 'Esta é uma simulação. Nenhuma senha foi armazenada ou alterada.'}</p><Button className="auth-submit" onClick={() => navigate({ to: '/login' })}>Voltar para entrar<ArrowRight /></Button>{mode === 'forgot' && <Button variant="ghost" className="mt-3 w-full" onClick={() => navigate({ to: '/reset-password' })}>Visualizar redefinição de senha</Button>}</> : <><h1>{title}</h1><p className="auth-subtitle">{subtitle}</p><form onSubmit={submit}>
    {mode === 'signup' && <div className="form-field"><label className="form-label" htmlFor="name">Como podemos chamar você?</label><Input id="name" required autoComplete="name" placeholder="Seu nome" value={name} onChange={e=>setName(e.target.value)} /></div>}
    {mode !== 'reset' && <div className="form-field"><label className="form-label" htmlFor="email">E-mail</label><Input id="email" type="email" required autoComplete="email" placeholder="voce@exemplo.com" value={email} onChange={e=>setEmail(e.target.value)} /></div>}
    {mode !== 'forgot' && <div className="form-field"><label className="form-label" htmlFor="password">{mode === 'reset' ? 'Nova senha' : 'Senha'}</label><div className="password-input"><Input id="password" type={visible?'text':'password'} required minLength={8} autoComplete={mode==='login'?'current-password':'new-password'} placeholder="Pelo menos 8 caracteres" value={password} onChange={e=>setPassword(e.target.value)} /><Button type="button" variant="ghost" size="icon" aria-label={visible?'Ocultar senha':'Mostrar senha'} onClick={()=>setVisible(!visible)}>{visible?<EyeOff />:<Eye />}</Button></div></div>}
    {mode === 'reset' && <div className="form-field"><label className="form-label" htmlFor="confirm">Confirme a nova senha</label><Input id="confirm" type={visible?'text':'password'} required minLength={8} autoComplete="new-password" value={confirm} onChange={e=>setConfirm(e.target.value)} /></div>}
    {mode === 'login' && <div className="auth-forgot"><Link to="/recuperar-senha">Esqueceu sua senha?</Link></div>}
    {error && <p role="alert" className="text-xs text-destructive mt-3">{error}</p>}
    <Button className="auth-submit" type="submit">{mode==='login'?'Entrar na demonstração':mode==='signup'?'Criar conta demonstrativa':mode==='forgot'?'Continuar':'Simular nova senha'}<ArrowRight /></Button>
    </form>{mode==='login' ? <p className="auth-switch">Ainda não tem uma conta? <Link to="/criar-conta">Criar conta</Link></p> : mode==='signup' ? <p className="auth-switch">Já tem uma conta? <Link to="/login">Entrar</Link></p> : <p className="auth-switch"><Link to="/login">Voltar para entrar</Link></p>}
    {(mode==='login'||mode==='signup') && <><div className="auth-divider">OU</div><Button className="auth-demo" variant="outline" onClick={()=>{demoLogin('Visitante','');navigate({to:'/'});}}>Explorar sem uma conta<ArrowUpRightIcon /></Button></>}
    <p className="auth-notice"><LockKeyhole className="inline size-3 mr-1" />Modo demonstrativo. Nenhuma senha é salva.<br />{mode==='signup'?'Nenhuma conta real é criada.':'Não use uma senha real nesta demonstração.'}</p></>}
    </div><footer className="auth-footer"><Link to="/termos-de-uso">Termos de Uso</Link><Link to="/politica-de-privacidade">Privacidade</Link></footer></div>;
}
function ArrowUpRightIcon() { return <ArrowRight className="-rotate-45" />; }
