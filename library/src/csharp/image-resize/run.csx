#r "System.Drawing"

using System;
using System.Drawing;
using ImageProcessor;

public static void Run(Stream original, Stream resized, TraceWriter log)
{
    using (var imageFactory = new ImageFactory())
    {
        imageFactory
            .Load(original)
            .Resize(new Size(100, 100))
            .Save(resized);
    }
}