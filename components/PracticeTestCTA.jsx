import { ArrowRight, Crosshair } from 'lucide-react';
import { ShinyButton } from './ui/shiny-button';

const PracticeTestCTA = ({ onStartTest }) => {
  return (
    <div id="practice-test" className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-gradient-to-br from-emerald-900/40 to-black border border-emerald-500/20 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden group">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.15),_transparent_60%)]" />
                
                <div className="relative z-10 flex flex-col items-center">
                    <div className="inline-flex items-center justify-center p-3 bg-emerald-500/20 rounded-xl mb-8 group-hover:scale-110 transition-transform duration-300">
                        <Crosshair className="h-8 w-8 text-emerald-400" />
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Ready to test your readiness?
                    </h2>
                    
                    <p className="text-xl text-zinc-300 max-w-2xl mb-10">
                        Take our Adaptive Diagnostic Test. It only takes 10 minutes and reveals your weak spots instantly based on high-priority topics.
                    </p>
                    
                    <ShinyButton
                         onClick={onStartTest}
                    >
                        Start Practice Test
                        <ArrowRight className="h-5 w-5" />
                    </ShinyButton>
                    
                    <p className="mt-6 text-sm text-zinc-500 font-medium">
                        Free • No Sign-up Required • Instant Results
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PracticeTestCTA;