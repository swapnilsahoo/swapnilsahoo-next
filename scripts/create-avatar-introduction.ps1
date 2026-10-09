# Creates stock synthetic narration locally. This is not a clone of the founder's voice.
[CmdletBinding()]
param()
$ErrorActionPreference = 'Stop'
$avatarRoot = Split-Path -Parent $PSScriptRoot
$avatarWork = Join-Path $avatarRoot 'artifacts/learning-lab/digital-avatar-build'
New-Item -ItemType Directory -Path $avatarWork -Force | Out-Null
Add-Type -AssemblyName System.Speech
$avatarSpeechAssembly = [System.Speech.Synthesis.SpeechSynthesizer].Assembly.Location
$avatarSpeechCode = @'
using System;
using System.Collections.Generic;
using System.Speech.Synthesis;
public class AvatarSpeechCue {
  public double Seconds;
  public int Viseme;
  public int CharacterPosition;
  public int CharacterCount;
}
public class AvatarNarration {
  public List<AvatarSpeechCue> Mouth = new List<AvatarSpeechCue>();
  public List<AvatarSpeechCue> Words = new List<AvatarSpeechCue>();
  public void Render(string script, string output) {
    using (var voice = new SpeechSynthesizer()) {
      voice.SelectVoice("Microsoft David Desktop");
      voice.Rate = 0;
      voice.VisemeReached += (sender, cue) => Mouth.Add(new AvatarSpeechCue {
        Seconds = cue.AudioPosition.TotalSeconds, Viseme = cue.Viseme
      });
      voice.SpeakProgress += (sender, cue) => Words.Add(new AvatarSpeechCue {
        Seconds = cue.AudioPosition.TotalSeconds,
        CharacterPosition = cue.CharacterPosition, CharacterCount = cue.CharacterCount
      });
      voice.SetOutputToWaveFile(output,
        new System.Speech.AudioFormat.SpeechAudioFormatInfo(16000,
          System.Speech.AudioFormat.AudioBitsPerSample.Sixteen,
          System.Speech.AudioFormat.AudioChannel.Mono));
      voice.Speak(script);
      voice.SetOutputToNull();
    }
  }
}
'@
Add-Type -TypeDefinition $avatarSpeechCode -ReferencedAssemblies $avatarSpeechAssembly
$avatarScript = @'
Hello. I'm Swapnil's digital learning guide. This is an animated likeness with a synthetic voice, rather than Swapnil speaking live.
Welcome to the Learning Lab. Explore six free mini-courses in AI, strategy and entrepreneurship.
Read a short lesson, try a business decision, and keep your worksheet.
Open the guide and choose a question by voice or text.
Voluntary support helps improve our learning content and infrastructure. The free courses remain free.
'@
$avatarNarration = New-Object AvatarNarration
$avatarNarration.Render($avatarScript, (Join-Path $avatarWork 'welcome.wav'))
$avatarMetadata = @{
  script = $avatarScript
  voice = 'Microsoft David Desktop / stock synthetic English voice'
  mouth = $avatarNarration.Mouth
  words = $avatarNarration.Words
}
$avatarMetadata | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $avatarWork 'narration.json') -Encoding UTF8
Write-Output "Created local synthetic narration: $($avatarNarration.Mouth.Count) mouth cues, $($avatarNarration.Words.Count) word cues."
